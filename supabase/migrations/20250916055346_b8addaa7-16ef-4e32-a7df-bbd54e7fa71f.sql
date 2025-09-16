-- Create enum types for various features
CREATE TYPE verification_status AS ENUM ('pending', 'in_review', 'approved', 'rejected');
CREATE TYPE document_type AS ENUM ('government_registration', 'founder_kyc', 'domain_validation', 'accreditation_proof', 'proof_of_funds', 'business_license');
CREATE TYPE subscription_plan AS ENUM ('free', 'pro', 'premium', 'elite');
CREATE TYPE message_type AS ENUM ('text', 'file', 'meeting_invite', 'data_room_request');
CREATE TYPE event_type AS ENUM ('pitch_event', 'demo_day', 'networking');
CREATE TYPE connection_status AS ENUM ('pending', 'accepted', 'declined');

-- Verification documents table
CREATE TABLE public.verification_documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    document_type document_type NOT NULL,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    status verification_status DEFAULT 'pending',
    notes TEXT,
    reviewed_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Data rooms table
CREATE TABLE public.data_rooms (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    startup_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Data room documents table
CREATE TABLE public.data_room_documents (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    data_room_id UUID NOT NULL,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    uploaded_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Data room access requests table
CREATE TABLE public.data_room_access_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    data_room_id UUID NOT NULL,
    investor_id UUID NOT NULL,
    status verification_status DEFAULT 'pending',
    nda_signed_at TIMESTAMP WITH TIME ZONE,
    nda_document_url TEXT,
    requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID
);

-- Connections table for user relationships
CREATE TABLE public.connections (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_id UUID NOT NULL,
    recipient_id UUID NOT NULL,
    status connection_status DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(requester_id, recipient_id)
);

-- Messages table
CREATE TABLE public.messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    connection_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    recipient_id UUID NOT NULL,
    message_type message_type DEFAULT 'text',
    content TEXT,
    file_url TEXT,
    file_name TEXT,
    meeting_link TEXT,
    meeting_time TIMESTAMP WITH TIME ZONE,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pitch events table
CREATE TABLE public.pitch_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_type event_type DEFAULT 'pitch_event',
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    max_participants INTEGER,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    meeting_link TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Pitch event participants table
CREATE TABLE public.pitch_event_participants (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID NOT NULL,
    user_id UUID NOT NULL,
    is_presenter BOOLEAN DEFAULT false,
    registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(event_id, user_id)
);

-- User subscriptions table
CREATE TABLE public.user_subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    plan subscription_plan NOT NULL,
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ends_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI project scores table
CREATE TABLE public.ai_project_scores (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    startup_id UUID NOT NULL,
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    team_execution_score INTEGER CHECK (team_execution_score >= 0 AND team_execution_score <= 100),
    market_potential_score INTEGER CHECK (market_potential_score >= 0 AND market_potential_score <= 100),
    business_model_score INTEGER CHECK (business_model_score >= 0 AND business_model_score <= 100),
    financial_health_score INTEGER CHECK (financial_health_score >= 0 AND financial_health_score <= 100),
    innovation_score INTEGER CHECK (innovation_score >= 0 AND innovation_score <= 100),
    risk_assessment_score INTEGER CHECK (risk_assessment_score >= 0 AND risk_assessment_score <= 100),
    ai_insights JSONB,
    recommendations TEXT[],
    badge_level TEXT CHECK (badge_level IN ('bronze', 'silver', 'gold', 'platinum')),
    calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_room_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_room_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pitch_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pitch_event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_project_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for verification_documents
CREATE POLICY "Users can view their own verification documents" ON public.verification_documents
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verification documents" ON public.verification_documents
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for data_rooms
CREATE POLICY "Startups can manage their own data rooms" ON public.data_rooms
FOR ALL USING (auth.uid() = startup_id);

CREATE POLICY "Users can view data rooms they have access to" ON public.data_rooms
FOR SELECT USING (
    auth.uid() = startup_id OR 
    EXISTS (
        SELECT 1 FROM public.data_room_access_requests 
        WHERE data_room_id = id AND investor_id = auth.uid() AND status = 'approved'
    )
);

-- RLS Policies for data_room_documents
CREATE POLICY "Users can manage documents in their data rooms" ON public.data_room_documents
FOR ALL USING (
    EXISTS (SELECT 1 FROM public.data_rooms WHERE id = data_room_id AND startup_id = auth.uid()) OR
    EXISTS (
        SELECT 1 FROM public.data_rooms dr 
        JOIN public.data_room_access_requests dar ON dr.id = dar.data_room_id 
        WHERE dr.id = data_room_id AND dar.investor_id = auth.uid() AND dar.status = 'approved'
    )
);

-- RLS Policies for connections
CREATE POLICY "Users can view their connections" ON public.connections
FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create connection requests" ON public.connections
FOR INSERT WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update connections they're part of" ON public.connections
FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" ON public.messages
FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages in their connections" ON public.messages
FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
        SELECT 1 FROM public.connections 
        WHERE id = connection_id AND status = 'accepted' AND 
        (requester_id = auth.uid() OR recipient_id = auth.uid())
    )
);

-- RLS Policies for pitch_events
CREATE POLICY "Users can view active pitch events" ON public.pitch_events
FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create pitch events" ON public.pitch_events
FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can manage their events" ON public.pitch_events
FOR ALL USING (auth.uid() = created_by);

-- RLS Policies for user_subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions
FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for ai_project_scores
CREATE POLICY "Users can view project scores" ON public.ai_project_scores
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.startup_profiles WHERE user_id = auth.uid() AND id = startup_id) OR
    EXISTS (SELECT 1 FROM public.investor_profiles WHERE user_id = auth.uid())
);

-- Add foreign key constraints
ALTER TABLE public.verification_documents ADD CONSTRAINT fk_verification_documents_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.data_rooms ADD CONSTRAINT fk_data_rooms_startup FOREIGN KEY (startup_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.data_room_documents ADD CONSTRAINT fk_data_room_documents_room FOREIGN KEY (data_room_id) REFERENCES public.data_rooms(id) ON DELETE CASCADE;
ALTER TABLE public.data_room_access_requests ADD CONSTRAINT fk_data_room_access_room FOREIGN KEY (data_room_id) REFERENCES public.data_rooms(id) ON DELETE CASCADE;
ALTER TABLE public.connections ADD CONSTRAINT fk_connections_requester FOREIGN KEY (requester_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.connections ADD CONSTRAINT fk_connections_recipient FOREIGN KEY (recipient_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.messages ADD CONSTRAINT fk_messages_connection FOREIGN KEY (connection_id) REFERENCES public.connections(id) ON DELETE CASCADE;
ALTER TABLE public.pitch_events ADD CONSTRAINT fk_pitch_events_creator FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.pitch_event_participants ADD CONSTRAINT fk_pitch_participants_event FOREIGN KEY (event_id) REFERENCES public.pitch_events(id) ON DELETE CASCADE;
ALTER TABLE public.user_subscriptions ADD CONSTRAINT fk_user_subscriptions_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_verification_documents_updated_at
BEFORE UPDATE ON public.verification_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_rooms_updated_at
BEFORE UPDATE ON public.data_rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_connections_updated_at
BEFORE UPDATE ON public.connections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();