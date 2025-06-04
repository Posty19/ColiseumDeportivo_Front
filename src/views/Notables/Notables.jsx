import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosConfig";

import Card from "../../components/Card/Card";

const getNotables = async () => {
  const res = await axiosInstance.get("/notables");
  return res.data;
};
const Notables = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notables"],
    queryFn: getNotables,
    stateTime: 0,
  });

  if (isLoading) return <Card className="loading">{children}</Card>;
  else if (error) return <p>Error</p>;
  else if (!data.notables) return <p>Sin Contenido por el momento</p>;
  else {
    return data.notables.map((notable) => {

      return <Card
        key={notable._id}
        id={notable._id}
        img={notable.photoRoute}
        title={notable.name}
        className="notable"
      >
        {children}
      </Card>;
    });
  }
};
export default Notables;
