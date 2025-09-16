-- Add missing RLS policies for pitch_event_participants
CREATE POLICY "Users can view pitch event participants" ON public.pitch_event_participants
FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.pitch_events WHERE id = event_id AND created_by = auth.uid())
);

CREATE POLICY "Users can register for pitch events" ON public.pitch_event_participants
FOR INSERT WITH CHECK (user_id = auth.uid());

-- Add missing RLS policies for data_room_access_requests
CREATE POLICY "Users can view their own access requests" ON public.data_room_access_requests
FOR SELECT USING (investor_id = auth.uid());

CREATE POLICY "Startup owners can view access requests for their data rooms" ON public.data_room_access_requests
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.data_rooms WHERE id = data_room_id AND startup_id = auth.uid())
);

CREATE POLICY "Investors can create access requests" ON public.data_room_access_requests
FOR INSERT WITH CHECK (investor_id = auth.uid());

CREATE POLICY "Startup owners can update access requests for their data rooms" ON public.data_room_access_requests
FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.data_rooms WHERE id = data_room_id AND startup_id = auth.uid())
);