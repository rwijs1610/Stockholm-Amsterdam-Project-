import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { FileBlob, PresentationFile } from '/Users/daimienmacbookair/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';

const workspaceDir = '/Users/daimienmacbookair/Documents/SD2 2026-2027/Zweden project/Stockholm-Amsterdam-Project-';
const skillDir = '/Users/daimienmacbookair/.codex/plugins/cache/openai-primary-runtime/presentations/26.1110.11613/skills/presentations';
const sourcePath = '/Users/daimienmacbookair/Documents/SD2 2026-2027/Zweden project/Bridging Cultures Pitch.pptx';
const referencePath = '/var/folders/nv/lnmzt4p11r5gp4kl21x3k9s40000gn/T/codex-clipboard-1eccf2d4-f56c-4460-92c2-dff4119ed4d1.png';
const candidatePath = path.join(workspaceDir, 'presentation-build/candidate.pptx');
const finalPath = path.join(workspaceDir, 'presentation-output/Bridging-Cultures-Pitch-Updated.pptx');
const receiptPath = path.join(workspaceDir, 'presentation-build/validation.json');

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const slide = presentation.slides.add({ background: { fill: '#F3F4F6' } });

function addText(name, text, position, style) {
  const shape = slide.shapes.add({
    geometry: 'textbox',
    name,
    position,
    fill: 'none',
    line: { style: 'solid', fill: 'none', width: 0 },
  });
  shape.text = text;
  shape.text.style = { ...style, wrap: 'square', autoFit: 'shrinkText', insets: 0 };
  return shape;
}

addText('Reference label', 'REFERENCE BOARD',
  { left: 86, top: 194, width: 330, height: 24 },
  { typeface: 'Courier New', fontSize: 14, bold: true, color: '#4A5568' });

addText('Slide title', 'Pitch\noverview',
  { left: 84, top: 240, width: 350, height: 144 },
  { typeface: 'Bricolage Grotesque', fontSize: 58, bold: true, color: '#101826', lineSpacing: 0.95 });

addText('Description', 'The project concept, visual direction, modules and prototype in one view.',
  { left: 86, top: 407, width: 328, height: 118 },
  { typeface: 'DM Sans', fontSize: 22, color: '#4A5568', lineSpacing: 1.15 });

addText('Footer', 'Bridging Cultures · Full stack team',
  { left: 86, top: 654, width: 360, height: 28 },
  { typeface: 'DM Sans', fontSize: 16, color: '#4A5568' });

const imageBytes = await fs.readFile(referencePath);
const imageBlob = imageBytes.buffer.slice(imageBytes.byteOffset, imageBytes.byteOffset + imageBytes.byteLength);
slide.images.add({
  blob: imageBlob,
  contentType: 'image/png',
  alt: 'Visual overview of the Bridging Cultures pitch, including the concept, moodboard, style tile, modules, architecture, prototype screens and project plan.',
  fit: 'contain',
  position: { left: 485, top: 32, width: 705, height: 656 },
});

await fs.mkdir(path.dirname(candidatePath), { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });
const preview = await slide.export({ format: 'png', scale: 1 });
await fs.writeFile(path.join(path.dirname(candidatePath), 'added-slide.png'), new Uint8Array(await preview.arrayBuffer()));
const montage = await presentation.export({ format: 'png', montage: { columns: 3, slideWidth: 420, gap: 18, padding: 18 }, scale: 1 });
await fs.writeFile(path.join(path.dirname(candidatePath), 'deck-montage.png'), new Uint8Array(await montage.arrayBuffer()));
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const { finalizePresentation } = await import(pathToFileURL(path.join(skillDir, 'container_tools/artifact_tool_utils.mjs')).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 10,
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: '/Users/daimienmacbookair/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
  integrityValidatorPath: path.join(skillDir, 'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath: path.join(skillDir, 'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs: ['--expected-slide-size-emu', '12192000,6858000', '--validate-bullet-geometry', '--validate-heading-fit'],
  requiredNativeTableOwnerSlides: [],
  fontPolicy: {
    basis: 'reference',
    families: ['Bricolage Grotesque', 'DM Sans', 'Courier New'],
    referencePath: sourcePath,
    referenceSha256: createHash('sha256').update(await fs.readFile(sourcePath)).digest('hex'),
  },
  verifyArtifactToolImport: true,
  receiptPath,
});
console.log(JSON.stringify({ finalPath, slideCount: presentation.slides.items.length, result }));
