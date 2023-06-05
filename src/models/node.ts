type Collections = 'Fields' | 'Object' | 'Array' | 'TypesArray';
type BlockCollections = 'Params' | 'ArrayType';
type Set = 'Separator' | 'Property';
type Literials =
  | 'NumberLiteral'
  | 'StringLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral';
export type Moment =
  | 'normal'
  | 'inside_brackets'
  | 'inside_paren'
  | 'inside_square_brackets';
export type Node =
  | {
      type: 'Block';
      value: string;
      children: Node | null;
    }
  | {
      type: 'EndLine';
    }
  | {
      type: Set;
      value: string;
    }
  | {
      type: BlockCollections;
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
