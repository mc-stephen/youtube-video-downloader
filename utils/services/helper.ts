class Helper {
  //================================
  //
  //================================
  static sanitizeFileName = (
    title: string,
    maxLength: number = 100
  ): string => {
    const sanitizedTitle = title.replace(/[<>:"/\\|?*]/g, "");
    return sanitizedTitle.length > maxLength
      ? `${sanitizedTitle.slice(0, maxLength).trim()}...`
      : sanitizedTitle;
  };
}

export default Helper;
