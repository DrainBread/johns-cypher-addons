import * as Utils from "../utilities/utils.js";

export async function registerHandlebars() {
    Handlebars.registerHelper('toJSON', (obj) => {
      if(!obj) return "";
      return JSON.stringify(obj);
    });

    Handlebars.registerHelper('find', function(iterable, k, v) {
      if(!iterable) return null;
      return (Array.from(iterable)).find( e => e[k] == v);
    });
    
    Handlebars.registerHelper('filter', function(iterable, k, v) {
      if(!iterable) return null;
      return (Array.from(iterable)).filter(e => e[k] == v);
    });
    
    Handlebars.registerHelper({
      eq: (v1, v2) => v1 === v2,
      ne: (v1, v2) => v1 !== v2,
      lt: (v1, v2) => v1 < v2,
      gt: (v1, v2) => v1 > v2,
      lte: (v1, v2) => v1 <= v2,
      gte: (v1, v2) => v1 >= v2,
      not: (v1) => !v1,
      and() {
          return Array.prototype.every.call(arguments, Boolean);
      },
      or() {
          return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      },
      sort() {
        if(arguments[0]){
          if(arguments[0].length > 0){
            return arguments[0].sort();
          } else {
            return Utils.sortObjKeys(arguments[0]);
          }
        }
        return null;
      }
  });

}

