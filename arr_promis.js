type AsyncFunction<T, U> = (arg: T) => Promise<U>;


async function asyncMap<T, U>(arr: T[], callback: AsyncFunction<T, U>): Promise<U[]> {
  
  const promises: Promise<U>[] = [];
 
  for (const elem of arr) {
    
    promises.push(callback(elem));
  }
  
  return Promise.all(promises);
}