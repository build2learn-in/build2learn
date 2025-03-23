export type Registration = {
  id: string;
  participationType: "HAS_IDEA" | "NEEDS_HELP" | "WANTS_TO_HELP";
  status: "REGISTERED" | "WAITLISTED" | "APPROVED" | "REJECTED";
  ideaDescription: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
};

export type Event = {
  id: string;
  title: string;
  maxParticipants: number | null;
  registrations: Registration[];
  _count: {
    registrations: number;
  };
}; 