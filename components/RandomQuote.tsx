import { API_URL } from "@/commons/commons";

type Quote = {
  q: string;
  a: string;
}[];

async function getData() {
  const res = await fetch(API_URL, { next: { revalidate: 2 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function RandomQuote() {
  const data: Quote = await getData();
  data && console.log("data", data && data);

  console.log("oh", data[0].q);
  console.log("eh");

  return (
    data && (
      <div>
        RandomQuote
        <div>
          {data.map((d, index) => {
            return (
              <p key={index}>
                {index}: {d.q}
                <br />- {d.a}
              </p>
            );
          })}
        </div>
      </div>
    )
  );
}
