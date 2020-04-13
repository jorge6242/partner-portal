const checkParameter =  (list: Array<string | number>, param: string) => {
    if (list.length > 0) {
      const current: any = list.find((e: any) => e.parameter === param);
      if (current) {
        if (current.value === "1") {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }

export default {
    checkParameter,
}