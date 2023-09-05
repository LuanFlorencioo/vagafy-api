-- DropForeignKey
ALTER TABLE "checkpoints" DROP CONSTRAINT "checkpoints_progress_id_fkey";

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_job_id_fkey";

-- DropForeignKey
ALTER TABLE "progress" DROP CONSTRAINT "progress_job_id_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_job_id_fkey";

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "job_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress" ADD CONSTRAINT "progress_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoints" ADD CONSTRAINT "checkpoints_progress_id_fkey" FOREIGN KEY ("progress_id") REFERENCES "progress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
