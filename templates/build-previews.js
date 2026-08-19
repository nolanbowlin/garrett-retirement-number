/* ═══ PREVIEW BUILDER ═══
   Generates the -preview.html files from the -template.html files by filling
   every merge token from preview-data.json.

   Why this exists rather than two hand written copies of each email: the
   moment there are two versions of the same document maintained separately,
   they drift, and the one that drifts is always the one nobody opened
   recently. Garrett looks at the preview and Paul builds against the
   template, so a divergence between them is a divergence between what the
   client approved and what actually gets sent. Generating one from the other
   makes that impossible.

   Run after editing any template or the data:

     node build-previews.js

   The build fails loudly on any token left unfilled rather than shipping a
   preview with {{handlebars}} showing in it, because a preview with a visible
   token is worse than no preview: it looks like a bug to the client.

   Usage note: the previews are build artefacts. Edit the template or the data,
   never the preview file itself. Anything typed directly into a preview is
   gone on the next build. */

'use strict';

var fs = require('fs');
var path = require('path');

var DATA = JSON.parse(fs.readFileSync(path.join(__dirname, 'preview-data.json'), 'utf8'));

var JOBS = [
  { template: 'report/email-report-template.html',
    output:   'report/email-report-preview.html',
    data:     DATA.emailReport,
    label:    'Retirement number report' },
  { template: 'newsletter/newsletter-monthly-template.html',
    output:   'newsletter/newsletter-monthly-preview.html',
    data:     DATA.newsletterMonthly,
    label:    'Monthly note' },
  { template: 'newsletter/newsletter-quarterly-template.html',
    output:   'newsletter/newsletter-quarterly-preview.html',
    data:     DATA.newsletterQuarterly,
    label:    'Quarterly review' },
  { template: 'correspondence/corr-01-letter-template.html',
    output:   'correspondence/corr-01-letter-preview.html',
    data:     DATA.corr01Letter,
    label:    'Correspondence A, the letter' },
  { template: 'correspondence/corr-02-logo-band-template.html',
    output:   'correspondence/corr-02-logo-band-preview.html',
    data:     DATA.corr02LogoBand,
    label:    'Correspondence B, logo band' },
  { template: 'correspondence/corr-03-credentials-template.html',
    output:   'correspondence/corr-03-credentials-preview.html',
    data:     DATA.corr03Credentials,
    label:    'Correspondence C, credentials' },
  { template: 'correspondence/corr-04-scenario-template.html',
    output:   'correspondence/corr-04-scenario-preview.html',
    data:     DATA.corr04Scenario,
    label:    'Correspondence D, the scenario' },
  { template: 'correspondence/corr-05-followup-template.html',
    output:   'correspondence/corr-05-followup-preview.html',
    data:     DATA.corr05Followup,
    label:    'Correspondence E, the follow up' }
];

/* A banner dropped into the top of every preview. It exists so that a file
   forwarded on its own is never mistaken for something that has cleared
   compliance. It is deliberately ugly. It is stripped by nothing: if this
   ever needs to go to a client as a clean file, take the banner out
   consciously rather than by accident. */
function banner(label) {
  return '<div style="background:#FFF4CE;border-bottom:2px solid #D2232A;padding:12px 20px;' +
         'font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#4A4A4A;text-align:center;">' +
         '<strong style="color:#111111;">PREVIEW, NOT APPROVED FOR SENDING.</strong> ' +
         label + ', filled with sample data so the layout and tone can be reviewed. ' +
         'Figures describe a fictional household. Awaiting Guardian advertising review.' +
         '</div>';
}

var failed = false;

JOBS.forEach(function (job) {
  var tpl = path.join(__dirname, job.template);
  if (!fs.existsSync(tpl)) {
    console.error('MISSING TEMPLATE: ' + job.template);
    failed = true;
    return;
  }

  var html = fs.readFileSync(tpl, 'utf8');

  var found = Object.create(null);
  (html.match(/\{\{[^}]+\}\}/g) || []).forEach(function (t) {
    found[t.slice(2, -2).trim()] = true;
  });

  /* Fill. Longest key first, so a key that is a prefix of another one cannot
     partially consume it. */
  Object.keys(job.data)
    .sort(function (a, b) { return b.length - a.length; })
    .forEach(function (key) {
      var token = new RegExp('\\{\\{\\s*' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\}\\}', 'g');
      html = html.replace(token, job.data[key]);
    });

  var leftover = Array.from(new Set(html.match(/\{\{[^}]+\}\}/g) || []));
  var unused = Object.keys(job.data).filter(function (k) { return !found[k]; });

  if (leftover.length) {
    console.error('UNFILLED in ' + job.output + ': ' + leftover.join(' '));
    failed = true;
  }
  if (unused.length) {
    console.warn('  note: data keys not present in ' + job.template + ': ' + unused.join(' '));
  }

  html = html.replace(/(<body[^>]*>)/i, '$1\n' + banner(job.label));

  fs.writeFileSync(path.join(__dirname, job.output), html);
  console.log((leftover.length ? 'FAILED  ' : 'built   ') + job.output +
              '  (' + Object.keys(job.data).length + ' values, ' +
              Math.round(html.length / 1024) + 'KB)');
});

if (failed) {
  console.error('\nBuild failed. Fix the tokens above and run again.');
  process.exit(1);
}
console.log('\nAll previews built. Previews are artefacts, edit the template or preview-data.json, never the preview.');
