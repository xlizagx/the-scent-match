import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-heading text-4xl text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground font-body mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-primary font-body underline">Go Home</Link>
      </div>
    </div>
  );
}
