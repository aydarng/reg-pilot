import { SignifyClient } from "signify-ts";

export type TestEnvironmentPreset =
  | "local"
  | "docker"
  | "rootsid_dev"
  | "rootsid_test"
  | "nordlei_dev"
  | "nordlei_demo"
  | "nordlei_dry";

export interface TestEnvironment {
  preset: TestEnvironmentPreset;
  url: string;
  bootUrl: string;
  vleiServerUrl: string;
  witnessUrls: string[];
  witnessIds: string[];
  apiBaseUrl: string;
  verifierBaseUrl: string;
  roleName: string;
  secrets: string[];
}

const WAN = "BBilc4-L3tFUnfM_wJr4S4OJanAv_VmF_dJNN6vkf2Ha";
const WIL = "BLskRTInXnMxWaGqcpSyMgo0nYbalW99cGZESrz3zapM";
const WES = "BIKKuvBwpmDVA4Ds-EpL5bt9OqPzWPja2LigFYZN2YfX";

export function resolveEnvironment(
  input?: TestEnvironmentPreset,
): TestEnvironment {
  const preset = input ?? process.env.TEST_ENVIRONMENT ?? "docker";
  const providedSecrets =
    process.env.SIGNIFY_SECRETS ||
    "D_PbQb01zuzQgK-kDWjqy,BTaqgh1eeOjXO5iQJp6mb,Akv4TFoiYeHNqzj3N8gEg,CbII3tno87wn3uGBP12qm";
  let env;
  switch (preset) {
    case "docker":
      env = {
        preset: preset,
        url: process.env.KERIA || "http://127.0.0.1:3901",
        bootUrl: process.env.KERIA_BOOT || "http://127.0.0.1:3903",
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "http://witness-demo:5642",
          "http://witness-demo:5643",
          "http://witness-demo:5644",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [WAN, WIL, WES],
        vleiServerUrl: process.env.VLEI_SERVER || "http://vlei-server:7723",
        apiBaseUrl: process.env.REG_PILOT_API || "http://127.0.0.1:8000",
        verifierBaseUrl: process.env.VLEI_VERIFIER || "http://127.0.0.1:7676",
        roleName: process.env.ROLE_NAME || "EBADataSubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    case "local":
      env = {
        preset: preset,
        url: process.env.KERIA || "http://127.0.0.1:3901",
        bootUrl: process.env.KERIA_BOOT || "http://127.0.0.1:3903",
        vleiServerUrl: process.env.VLEI_SERVER || "http://localhost:7723",
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "http://localhost:5642",
          "http://localhost:5643",
          "http://localhost:5644",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [WAN, WIL, WES],
        apiBaseUrl: process.env.REG_PILOT_API || "http://localhost:8000",
        verifierBaseUrl: process.env.VLEI_VERIFIER || "http://localhost:7676",
        roleName: process.env.ROLE_NAME || "EBADataSubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    case "rootsid_dev":
      env = {
        preset: preset,
        url: process.env.KERIA || "https://keria-dev.rootsid.cloud/admin",
        bootUrl: process.env.KERIA_BOOT || "https://keria-dev.rootsid.cloud",
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "https://witness-dev01.rootsid.cloud",
          "https://witness-dev02.rootsid.cloud",
          "https://witness-dev03.rootsid.cloud",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [WAN, WIL, WES],
        vleiServerUrl:
          process.env.VLEI_SERVER || "http://schemas.rootsid.cloud",
        apiBaseUrl:
          process.env.REG_PILOT_API ||
          "https://reg-api-dev.rootsid.cloud/docs/",
        verifierBaseUrl:
          process.env.VLEI_VERIFIER || "RootsID dev verifier not set",
        roleName: process.env.ROLE_NAME || "EBADataSubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    case "rootsid_test":
      env = {
        preset: preset,
        url:
          process.env.KERIA || "https://keria-demoservice.rootsid.cloud/admin",
        bootUrl:
          process.env.KERIA_BOOT || "https://keria-demoservice.rootsid.cloud",
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "https://witness-dev01.rootsid.cloud",
          "https://witness-dev02.rootsid.cloud",
          "https://witness-dev03.rootsid.cloud",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [WAN, WIL, WES],
        vleiServerUrl:
          process.env.VLEI_SERVER || "http://schemas.rootsid.cloud",
        apiBaseUrl:
          process.env.REG_PILOT_API ||
          "https://reg-api-test.rootsid.cloud/docs/",
        verifierBaseUrl:
          process.env.VLEI_VERIFIER || "RootsID demo verifier not set",
        roleName: process.env.ROLE_NAME || "EBADataSubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    case "nordlei_dev":
      env = {
        preset: preset,
        url: process.env.KERIA || "https://demo.wallet.vlei.tech",
        bootUrl: process.env.KERIA_BOOT || "https://demo.wallet.vlei.tech/boot", // must request access
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "https://william.witness.vlei.tech/oobi",
          "https://wesley.witness.vlei.tech/oobi",
          "https://whitney.witness.vlei.tech/oobi",
          "https://wilma.witness.vlei.tech/oobi",
          "https://wilbur.witness.vlei.tech/oobi",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [
          "BMn9DacVHdgg66ukO0fYwQx1IV5hCchPd7Gb5zCCQYsv",
          "BGNpoM1a8VMMJEZC8DKgiyEsTTviWkgQ6e4f6rRFkoxV",
          "BLiMaTh2Mr540wD6FynMc3SaAtHhjOTJfO_j-1E7WwC2",
          "BFX3CtauhMYyLOxX44q4yzQfwd4ekmBWF1oteXx8iiWn",
          "BOwl2CUm-5nvVy8krTlSxzHkcQSBAXHYz412Cl-e20xS",
        ],
        vleiServerUrl:
          process.env.VLEI_SERVER || "http://schemas.rootsid.cloud",
        apiBaseUrl:
          process.env.REG_PILOT_API || "NordLEI dev reg-pilot-api not set",
        verifierBaseUrl:
          process.env.VLEI_VERIFIER || "NordLEI dev verifier not set",
        roleName: process.env.ROLE_NAME || "EBADataSubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    case "nordlei_demo":
      env = {
        preset: preset,
        url: process.env.KERIA || "https://errp.wallet.vlei.io",
        bootUrl: process.env.KERIA_BOOT || "https://errp.wallet.vlei.io/boot",
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "https://william.witness.vlei.io/oobi",
          "https://wesley.witness.vlei.io/oobi",
          "https://whitney.witness.vlei.io/oobi",
          "https://wilma.witness.vlei.io/oobi",
          "https://wilbur.witness.vlei.io/oobi",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [
          "BB6_wAm4rtFPRFg1qJHbC1RWNcRKMth2sFw6MgSqFKg_",
          "BGJvFwob-UV5J1vSbuCroz27k4FGaZE992K4sc79cD54",
          "BMMOAZ4Ujv0jP3VhCAHmx9yTSBoP1sAoDjFXas14JYG-",
          "BIrxc3loHN4kQ2HN8Ev-bisMBZzkdfXQdwl4KKdy2iZh",
          "BDTChgVW3pAxkYCYDVWV9DQYu_FTZ8laD-WhpFHvY9SQ",
        ],
        vleiServerUrl:
          process.env.VLEI_SERVER || "http://schemas.rootsid.cloud",
        apiBaseUrl:
          process.env.REG_PILOT_API || "NordLEI demo reg-pilot-api not set",
        verifierBaseUrl:
          process.env.VLEI_VERIFIER || "NordLEI demo verifier not set",
        roleName: process.env.ROLE_NAME || "unicredit-datasubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    case "nordlei_dry":
      env = {
        preset: preset,
        url: process.env.KERIA || "https://testbank.wallet.dryrun.vlei.dev",
        bootUrl:
          process.env.KERIA_BOOT ||
          "https://testbank.wallet.dryrun.vlei.dev/boot",
        witnessUrls: process.env.WITNESS_URLS?.split(",") || [
          "https://william.witness.dryrun.vlei.dev/oobi",
        ],
        witnessIds: process.env.WITNESS_IDS?.split(",") || [
          "BFEr4VPW1B2oWwlNG3rjwe2c-eyXbtqqJds88bDnFGNk",
        ],
        vleiServerUrl:
          process.env.VLEI_SERVER || "http://schemas.rootsid.cloud",
        apiBaseUrl:
          process.env.REG_PILOT_API || "NordLEI demo reg-pilot-api not set",
        verifierBaseUrl:
          process.env.VLEI_VERIFIER || "NordLEI demo verifier not set",
        roleName: process.env.ROLE_NAME || "unicredit-datasubmitter",
        secrets: providedSecrets.split(","),
      };
      break;
    default:
      throw new Error(`Unknown test environment preset '${preset}'`);
  }
  console.log("Test environment preset: ", JSON.stringify(env));
  return env;
}
