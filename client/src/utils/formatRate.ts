export default (num: number): string[] => num?.toFixed(1).toString().split("."); // 3.43352323 => 3.4 => [3,4]
