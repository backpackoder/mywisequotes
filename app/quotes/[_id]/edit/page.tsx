"use client";

export default function QuoteEdit({ params }: { params: { _id: string } }) {
  const { _id } = params;

  return <div>QuoteEdit page. ID: {_id}</div>;
}
