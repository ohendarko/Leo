// lib/frameworks/test.ts
import { getFrameworkContext, getFrameworkNames, ALL_FRAMEWORKS } from './index';

console.log('=== Framework System Test ===\n');

console.log('Available Frameworks:');
getFrameworkNames().forEach((name, idx) => {
  console.log(`  ${idx + 1}. ${name}`);
});

console.log(`\nTotal Frameworks: ${ALL_FRAMEWORKS.length}`);

console.log('\n=== Sample Framework Content ===');
console.log('NASSS Framework (first 200 chars):');
console.log(ALL_FRAMEWORKS[0].content.substring(0, 200) + '...');

console.log('\n✅ Framework system is working!');