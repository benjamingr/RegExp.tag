// Based off Mark Miller and C. Scott Ananian's work in the ESDiscuss mailing list as well
// as work on the RegExp.escape proposal at https://github.com/benjamingr/RexExp.escape

if(!RegExp.tag){
  RegExp.tag = function tag(flags = '', ...args) {
    return function tag(template, ...subs) {
      const parts = [];
      for (let i = 0; i < subs.length; i++) { 
        parts.push(template.raw[i]); 
        const subst = subs[i].source ? subs[i].source : subs[i].replace(/[\/\\^$*+?.()|[\]{}]/g, '\\$&');
        parts.push(subst); 
      }
      parts.push(template.raw[subs.length]);
      return RegExp(parts.join(''), flags); 
    };
  };
}
