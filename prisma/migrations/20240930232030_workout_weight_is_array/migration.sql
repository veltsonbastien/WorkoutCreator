/*
  Warnings:

  - The `weight` column on the `WorkoutExercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION[];
