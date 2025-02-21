function getVersions(semver, previousMinors = 0) {
    const [major, minor] = semver.split('.').map(Number);

    const versions = [];
    versions.push(semver);

    for (let i = 1; i <= previousMinors; i++) {
        const prevMinor = minor - i;
        if (prevMinor >= 0) {
            versions.push(`${major}.${prevMinor}`);
        }
    }

    versions.push(`${major}`);

    return versions;
}


function generateCombinations(semvers, oss) {
    const combinations = [];
    for (const semver of semvers) {
        const versions = getVersions(semver, 2);
        for (const os of oss) {
            for (const version of versions) {
                const [major] = version.split('.');
                combinations.push({
                    postgres_version: version,
                    os_version: os,
                    postgres_major: parseInt(major, 10),
                });
            }
        }
    }
    return combinations;
}

const args = {};
for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        args[key] = value;
    }
}

if (!args.semvers || !args.oss) {
    console.error('Usage: node generate-matrix.js --semvers=["14.2","13.5"] --oss=["debian","alpine"]');
    process.exit(1);
}

const semvers = JSON.parse(args.semvers);
const oss = JSON.parse(args.oss);

const combinations = generateCombinations(semvers, oss);

console.log(JSON.stringify(combinations));