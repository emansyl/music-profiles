import { getTrack } from "../../../lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const { id } = req.query;

  const {
    token: { accessToken },
  } = await getSession({ req });

  const response = await getTrack(accessToken, id);
  const items = await response.json();

  return res.status(200).json(items);
};

export default handler;
