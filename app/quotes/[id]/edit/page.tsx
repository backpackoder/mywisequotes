"use client";

export default function QuoteEdit({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>QuoteEdit page. ID: {id}</div>;
}
