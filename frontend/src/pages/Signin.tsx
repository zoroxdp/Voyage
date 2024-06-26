import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Auth authType="signin"></Auth>
        <div className="hidden lg:block"><Quote></Quote></div>
      </div>
    </div>
  );
};
