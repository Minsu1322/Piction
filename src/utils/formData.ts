//날짜 관리 함수

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    // 오늘
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `오늘 ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  } else if (diffDays === 1) {
    // 어제
    return "어제";
  } else if (diffDays < 7) {
    // 일주일 내
    return `${diffDays}일 전`;
  } else {
    // 일주일 이상
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }
}
