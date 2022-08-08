import { getUsersTop } from "../../../lib/spotify";
import { getSession } from "next-auth/react";
// api/top/limit/offest/time_range/type
const handler = async (req, res) => {
  const { slug } = req.query;

  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getUsersTop(accessToken, slug);
  const { items } = await response.json();

  return res.status(200).json({ items });
};

export default handler;
