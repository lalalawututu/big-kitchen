import RetrospectIndex from "@/oldpages/quality/retrospect/retrospect.js";
import retrospectContainer from "@/container/retrospect";

export default function Retrospect() {
  return (
    <retrospectContainer.Provider>
      <RetrospectIndex />
    </retrospectContainer.Provider>
  )
}



