export type ICoords = [number, number?, number?];
export enum EPriority {
  "critical" = 1,
  "high" = 0.75,
  "medium" = 0.5,
  "low" = 0.25,
  "trivial" = 0.1,
}

export enum ECheckType {
  script = "script",
  size = "size",
  eval = "eval",
}

export enum EStatus {
  pending = "pending",
  unknown = "unknown",
  blocked = "blocked",
  likelyBlocked = "likelyBlocked",
  likelyUnblocked = "likelyUnblocked",
  unblocked = "unblocked",
}

export const statusWeights = {
  [EStatus.pending]: 0,
  [EStatus.unknown]: 0,
  [EStatus.unblocked]: 0,
  [EStatus.blocked]: 1,
  [EStatus.likelyBlocked]: 0.333,
  [EStatus.likelyUnblocked]: 0.666,
};

export const typeWeights = {
  [ECheckType.script]: 0.25,
  [ECheckType.eval]: 0.75,
  [ECheckType.size]: 1,
};

export type ISection = {
  id: string;
  prevVisible: boolean;
  visible: boolean;
  active: boolean;
  titleKey: string;
  descriptionKey: string;
  priority: keyof typeof EPriority;
  services: string[];
};

export type IService = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  prevVisible: boolean;
  visible: boolean;
  active: boolean;
  checks: string[];
};

export type ICheck = IScriptCheck | IEvalCheck | ISizeCheck;

type ICommonsFromCheck = {
  sectionId: string;
  id: string;
  status: EStatus;
};
export type IScriptCheck = ICommonsFromCheck & {
  type: ECheckType.script;
  url: string;
  approxSize: number;
};
export type IEvalCheck = ICommonsFromCheck & {
  type: ECheckType.eval;
  evals: string[];
  depends: string;
};
export type ISizeCheck = ICommonsFromCheck & {
  type: ECheckType.size;
  include: string;
  visible: boolean;
  flash?: boolean;
  proved?: boolean;
  external?: boolean;
};
