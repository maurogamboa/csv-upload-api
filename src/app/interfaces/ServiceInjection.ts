import Repository from "../../core/repositories/repository";

export interface ServicesInjection {
  repository: { new(): Repository }, 
}