import GameSentences from "../../components/gameSentences/GameSentences";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

export default function GameTushetians() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/videodatas/single/${id}`).then((res) => {
        return { ...res.data };
      }),
  });
  return (
    <div className="">
      <div className="">თუშურის სასწავლო თამაში</div>
      <GameSentences sentencesType="Tushetians"/>
    </div>
  );
}
