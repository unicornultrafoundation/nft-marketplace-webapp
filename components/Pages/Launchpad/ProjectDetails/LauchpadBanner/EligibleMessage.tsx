interface PropsMessageRoundNotEligible {
  eligibleStatus: boolean;
}
export function MessageRoundNotEligible({
  eligibleStatus,
}: PropsMessageRoundNotEligible) {
  return (
    <p className="text-body-16 font-medium">
      You are{" "}
      <span
        className={`font-semibold ${eligibleStatus ? "text-success" : "text-error"}`}
      >
        {eligibleStatus ? "ELIGIBLE" : "NOT ELIGIBLE"}
      </span>{" "}
      to join this round
    </p>
  );
}
