export async function POST(request: Request) {
  try {
    const req = await request.json();
    const body = JSON.stringify(req);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
