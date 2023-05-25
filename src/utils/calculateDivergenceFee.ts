export function calculateDivergenceFee(markToIndexDelta: number) {
  switch (true) {
    case markToIndexDelta >= 20:
      return {
        longFee: 0.2,
        shortFee: 0.2,
      };

    case markToIndexDelta >= 15:
      return {
        longFee: 0.15,
        shortFee: 0.0013,
      };

    case markToIndexDelta >= 10:
      return {
        longFee: 0.1,
        shortFee: 0.0013,
      };

    case markToIndexDelta >= 5:
      return {
        longFee: 0.5,
        shortFee: 0.0015,
      };
    case markToIndexDelta >= 2.5:
      return {
        longFee: 0.01,
        shortFee: 0.002,
      };

    case markToIndexDelta <= -20:
      return {
        longFee: 0.0013,
        shortFee: 0.2,
      };

    case markToIndexDelta <= -15:
      return {
        longFee: 0.0013,
        shortFee: 0.15,
      };

    case markToIndexDelta <= -10:
      return {
        shortFee: 0.1,
        longFee: 0.0013,
      };

    case markToIndexDelta <= -5:
      return {
        shortFee: 0.5,
        longFee: 0.0015,
      };

    case markToIndexDelta <= -2.5:
      return {
        shortFee: 0.01,
        longFee: 0.002,
      };

    default:
      return {
        longFee: 0,
        shortFee: 0,
      };
  }
}
