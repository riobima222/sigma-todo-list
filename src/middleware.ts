import { NextRequest } from "next/server";
import { withLogin } from "./middlewares/withLogin";
import { ifLogin } from "./middlewares/ifLogin";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  if (pathname == "/") {
    return await withLogin(req);
  } else if (pathname == "/auth/login" || pathname == "/auth/register") {
    return await ifLogin(req);
  }
};

export const config = {
  matchers: ["/"],
};
