import { Data } from "./data-type";
import data from "./data.json";

/**
 * Fake request to an API that returns an object with blocks and movies.
 */
const getPage = (): Promise<Data> =>
  new Promise((res, rej) => {
    setTimeout(() => res(data as Data), 500);
  });

export default getPage;
