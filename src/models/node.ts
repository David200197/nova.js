type Collections = 'Fields' | 'Object' | 'Array';
type Literials =
  | 'NumberLiteral'
  | 'StringLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral';
export type Node =
  | {
      type: 'Block';
      value: string;
      children: Node | null;
    }
  | {
      type: 'Separator' | 'Property';
      value: string;
    }
  | {
      type: 'Params';
      params: Node[];
      children: Node | null;
    }
  | {
      type: Collections;
      params: Node[];
    }
  | {
      type: Literials;
      value: string;
    };
