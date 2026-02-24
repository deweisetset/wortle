declare global {
  interface Window {
    game?: any;
    currentUser?: {
      id: number;
      google_id: string;
      email?: string;
      name?: string;
      picture?: string;
      display_name: string;
      total_score: number;
    };
  }
}

export {};
