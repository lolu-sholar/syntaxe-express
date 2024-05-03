"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.timeTicksMap=exports.timeDurationMap=exports.timeDuration=exports.patterns=exports.monthMap=exports.flags=exports.dayMap=void 0;exports.flags={resolve:"Syntaxe-Resolve-Schema",client:"Syntaxe-Client-Handle"},exports.patterns={general:{newLine:/(\\n|\n)/,opList:/\](\s*)\[/,operation:/\[|\]/,quotes:/(\`|\"|\')|(\`|\"|\')/,raws:/ {2,}/,ws:/ /,nonTimeXter:/[^\d:]/,nonDigit:/[^\d]/,nonDecimal:/[^\d\.]/,nonAlphabet:/[^a-z]/,nonSign:/[^-\+]/,omission:/\?/},operations:{propertyOp:/(((\w+)(\s*)(\??))((\s*)\[(\s*)(\w+)(\s*)(:*)(\s*)(\'([\w\+\s\(\):]*|\s{1,})\'|\"([\w\+\s\(\):]*|\s{1,})\"|(\[[\"\w\+\s\(\):\",]+\])|(\"[-\d\w\s]+\")|(\[(\s*)\/(\^?)(\w+)(\$?)\/(\w*)(\,(\s*)\/(\^?)(\w+)(\$?)\/(\w*))*(\s*)\])|(\[(\s*)\"[\w\/]*\"(\,(\s*)\"[\w\/]*\")+(\s*)\](\s*))|(\w+)|((\/)(\S+)(\/)(\w*)(\s*))|(\S+))\])+)/,objectOp:/(((\})(\s*))((\s*)\[(\w+)(\s*)(:*)(\s*)((\[[\"\w\+\s\(\):\",]+\])|\"(\w+)\"|(\w+)|((\+|\-){1}\w+))\])+)/},schema:{commaAndSpace:/(,)|(\s{2,})/,objectProperty:/(((\w+)(\-|\.)*(\w+)(\??))|(\*instr-p:((\w+)(\-|\.)*(\w+)))|(\*instr-o:id_(\w+)))/,spaceAndBrace:/(" ")|((" |")\{)|((" |")\})/,braceAndSpace:/\}( "|")/}},exports.monthMap=new Map([[0,["january","jan"]],[1,["february","feb"]],[2,["march","mar"]],[3,["april","apr"]],[4,["may","may"]],[5,["june","jun"]],[6,["july","jul"]],[7,["august","aug"]],[8,["september","sep"]],[9,["october","oct"]],[10,["november","nov"]],[11,["december","dec"]]]),exports.dayMap=new Map([[1,["monday","mon"]],[2,["tuesday","tue"]],[3,["wednesday","wed"]],[4,["thursday","thu","thur"]],[5,["friday","fri"]],[6,["saturday","sat"]],[0,["sunday","sun"]]]),exports.timeDuration=["se","second","seconds","mi","minute","minutes","hr","hour","hours","dy","day","days","wk","week","weeks","mo","month","months","yr","year","years"];var e=exports.timeTicksMap=new Map([["sec",1e3],["min",6e4],["hou",36e5],["day",864e5],["wee",6048e5],["mon",26784e5],["yea",321408e5]]);exports.timeDurationMap=new Map([["se",e.get("sec")],["second",e.get("sec")],["seconds",e.get("sec")],["mi",e.get("min")],["minute",e.get("min")],["minutes",e.get("min")],["hr",e.get("hou")],["hour",e.get("hou")],["hours",e.get("hou")],["dy",e.get("day")],["day",e.get("day")],["days",e.get("day")],["wk",e.get("wee")],["week",e.get("wee")],["weeks",e.get("wee")],["mo",e.get("mon")],["month",e.get("mon")],["months",e.get("mon")],["yr",e.get("yea")],["year",e.get("yea")],["years",e.get("yea")]]);