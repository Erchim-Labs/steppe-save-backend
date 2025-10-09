import { cron } from "..";
import logger from "../config/winston";
import { aiGrowthService } from "../services/aiGrowthService";

export async function startCronJobs() {
  // cron.schedule("0 */5 * * * *", async () => {
  //   logger.info("Test cronjob.");
  // });
  cron.schedule("0 0 * * * *", async () => {
    logger.info("Running weekly growth summary.");
    const result = await aiGrowthService.generateWeeklyInsights();
    logger.info(result, "Weekly growth summary generated.");
  });
}
