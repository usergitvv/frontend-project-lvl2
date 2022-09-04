const stylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:${' '}
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const stylishResult2 = `{
  + common: {
        follow: false
        setting1: Value 1
        setting3: null
        setting4: blah blah
        setting5: {
            key5: value5
        }
        setting6: {
            key: value
            ops: vops
            doge: {
                wow: so much
            }
        }
    }
  + group1: {
        foo: bar
        baz: bars
        nest: str
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const stylishResult3 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
    group4: {
      - default: null
      + default: 
      - foo: 0
      + foo: null
      - isNested: false
      + isNested: none
      + key: false
        nest: {
          - bar:${' '}
          + bar: 0
          - isNested: true
        }
      + someKey: true
      - type: bas
      + type: bar
    }
    language: js
}`;

const plainResult = `Property 'common' was added with value: [complex value]
Property 'group1' was added with value: [complex value]
Property 'group3' was added with value: [complex value]`;

const jsonResult = '[{"setting1":"Value 1","+setting4":"blah blah","+key5":"value5","-wow":"","+wow":"so much","key":"value","+ops":"vops","-baz":"bas","+baz":"bars","foo":"bar","+nest":"str"}]';

const jsonResult2 = '[{"+setting1":"Value 1","+setting4":"blah blah","+key5":"value5","+key":"value","+ops":"vops","+wow":"so much","+foo":"bar","+baz":"bars","+nest":"str"}]';

export {
  stylishResult,
  stylishResult2,
  stylishResult3,
  plainResult,
  jsonResult,
  jsonResult2,
};
