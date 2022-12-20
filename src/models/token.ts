type Types =
  | 'bracket'
  | 'number'
  | 'string'
  | 'paren'
  | 'square_bracket'
  | 'equal'
  | 'name'
  | 'question_mark'
  | 'comma'
  | 'colon';
export type Token = { type: Types; value: string };
