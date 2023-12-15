export function timestampDiffrenceConvertor(created_at : any) {

  const now = new Date();
  const otherTimestamp = new Date(created_at * 1000);
  const timeDiff = Math.abs(now - otherTimestamp);

  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursDiff = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return {
    daysDiff,
    hoursDiff,
  };
}
