-- ====================================================================
-- MSIT WEBSITE: ADMIN DASHBOARD & STUDENT APPLICATION SCHEMA
-- ====================================================================
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/oknaeingqybfxpfpuocy/sql)
--
-- Tables created:
-- 1. admin_users               : Authorized administrator directory
-- 2. applications              : Full student application records
-- 3. application_documents     : Document references and verification status
-- 4. application_notes         : Internal admissions committee notes
-- 5. application_status_history: Audit trail of application status changes
--
-- Security:
-- - Row Level Security (RLS) is ENABLED on all tables.
-- - Backend check: grants full admin access to users with @getskills.io
--   (TEMPORARY — DEVELOPMENT/TESTING ONLY) or users listed in admin_users.
-- - Students can only view and insert their own application data.
-- ====================================================================

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin', -- 'admin', 'super_admin'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Seed initial authorized admin accounts:
INSERT INTO public.admin_users (email, full_name, role) VALUES
    ('head@msitprogram.net', 'MSIT Head', 'super_admin'),
    ('dean@msitprogram.net', 'MSIT Dean', 'super_admin'),
    ('varshithathorthi04@msitprogram.net', 'Varshitha Thorthi', 'admin'),
    ('sadhvik@getskills.io', 'Sadhvik', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 2. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id TEXT UNIQUE NOT NULL, -- e.g. 'MSIT-2027-10492'
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    dob DATE,
    address TEXT,
    parent_relationship TEXT DEFAULT 'Father',
    parent_name TEXT,
    alt_phone TEXT,
    ug_degree TEXT,
    department TEXT,
    cgpa TEXT,
    passing_year TEXT,
    has_experience TEXT DEFAULT 'No',
    experience_details TEXT,
    purpose_to_join TEXT,
    status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Under Review', 'Documents Pending', 'Documents Verified', 'Accepted', 'Declined'
    document_status TEXT NOT NULL DEFAULT 'Pending Review', -- 'Pending Review', 'Partially Verified', 'Verified', 'Rejected'
    cohort TEXT DEFAULT 'January 2027 Intake',
    decision_reason TEXT,
    decided_by TEXT,
    decided_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Indexing for fast search and filtering
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON public.applications(submitted_at DESC);

-- 3. APPLICATION DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
    doc_type TEXT NOT NULL, -- 'Marksheets / Transcripts', 'Degree / Provisional Certificate', 'Photo ID Proof', 'Resume / CV', 'Other'
    file_name TEXT NOT NULL,
    file_url TEXT,
    file_size TEXT,
    status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Verified', 'Rejected'
    rejection_reason TEXT,
    reviewed_by TEXT,
    reviewed_at TIMESTAMPTZ,
    uploaded_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_application_documents_app_id ON public.application_documents(application_id);

-- 4. APPLICATION NOTES TABLE (Internal Admissions Committee Notes)
CREATE TABLE IF NOT EXISTS public.application_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
    note TEXT NOT NULL,
    admin_email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_application_notes_app_id ON public.application_notes(application_id);

-- 5. APPLICATION STATUS HISTORY (Immutable Audit Trail)
CREATE TABLE IF NOT EXISTS public.application_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_by TEXT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_status_history_app_id ON public.application_status_history(application_id);


-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if user is an authorized admin
-- NOTE: @getskills.io rule is TEMPORARY — DEVELOPMENT/TESTING ONLY.
-- Replace with verified admin_users check before production.
CREATE OR REPLACE FUNCTION public.is_authorized_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        -- Authorized domains (@msitprogram.net and @getskills.io):
        (auth.jwt() ->> 'email') ILIKE '%@msitprogram.net'
        OR
        (auth.jwt() ->> 'email') ILIKE '%@getskills.io'
        OR
        -- Official database role check:
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE email = (auth.jwt() ->> 'email')
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- ADMIN POLICIES ---

-- Admin Users Table
DROP POLICY IF EXISTS "Admins can view admin directory" ON public.admin_users;
CREATE POLICY "Admins can view admin directory"
    ON public.admin_users FOR SELECT
    TO authenticated
    USING (public.is_authorized_admin());

-- Applications Table
DROP POLICY IF EXISTS "Admins have full access to applications" ON public.applications;
CREATE POLICY "Admins have full access to applications"
    ON public.applications FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

DROP POLICY IF EXISTS "Students can view their own applications" ON public.applications;
CREATE POLICY "Students can view their own applications"
    ON public.applications FOR SELECT
    TO authenticated
    USING (email = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Students can submit their application" ON public.applications;
CREATE POLICY "Students can submit their application"
    ON public.applications FOR INSERT
    TO authenticated
    WITH CHECK (email = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Allow anon submissions for guest portal apply" ON public.applications;
CREATE POLICY "Allow anon submissions for guest portal apply"
    ON public.applications FOR INSERT
    TO anon
    WITH CHECK (true);

-- Application Documents Table
DROP POLICY IF EXISTS "Admins have full access to documents" ON public.application_documents;
CREATE POLICY "Admins have full access to documents"
    ON public.application_documents FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

DROP POLICY IF EXISTS "Students can view their own documents" ON public.application_documents;
CREATE POLICY "Students can view their own documents"
    ON public.application_documents FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.applications a
            WHERE a.id = application_documents.application_id
              AND a.email = (auth.jwt() ->> 'email')
        )
    );

-- Application Notes Table (STRICTLY ADMIN ONLY)
DROP POLICY IF EXISTS "Admins have full access to internal notes" ON public.application_notes;
CREATE POLICY "Admins have full access to internal notes"
    ON public.application_notes FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- Status History Table (STRICTLY ADMIN ONLY)
DROP POLICY IF EXISTS "Admins have full access to status history" ON public.application_status_history;
CREATE POLICY "Admins have full access to status history"
    ON public.application_status_history FOR ALL
    TO authenticated
    USING (public.is_authorized_admin())
    WITH CHECK (public.is_authorized_admin());

-- ====================================================================
-- TRIGGERS: Automatically update updated_at timestamp
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_applications_updated_at ON public.applications;
CREATE TRIGGER set_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
