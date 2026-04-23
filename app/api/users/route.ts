import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// GET - ambil semua users
export async function GET() {
  const users = await sql`
    SELECT id, email, role FROM users ORDER BY id DESC
  `;
  return Response.json(users);
}

// POST - tambah user
export async function POST(req: Request) {
  const { email, role } = await req.json();

  if (!email || !role) {
    return Response.json({ error: "Email & role wajib" }, { status: 400 });
  }

  await sql`
    INSERT INTO users (email, role)
    VALUES (${email}, ${role})
  `;

  return Response.json({ success: true });
}

// DELETE - hapus user
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await sql`
    DELETE FROM users WHERE id = ${id}
  `;

  return Response.json({ success: true });
}

// PATCH - update user
export async function PATCH(req: Request) {
  const { id, email, role } = await req.json();

  await sql`
    UPDATE users
    SET email = ${email}, role = ${role}
    WHERE id = ${id}
  `;

  return Response.json({ success: true });
}