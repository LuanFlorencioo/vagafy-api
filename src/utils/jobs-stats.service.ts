import { Injectable } from '@nestjs/common';
import { isThisMonth, isThisWeek, isThisYear, isToday, getDay } from 'date-fns';
import { Job } from 'src/models/job.model';

@Injectable()
export class JobsStatsService {
  getStats(jobs: Job[]) {
    const total = jobs.length;

    let inProgress = 0,
      inFinished = 0,
      pendings = 0,
      negatives = 0,
      positives = 0,
      applyToday = 0,
      applyThisWeek = 0,
      applyThisMouth = 0,
      applyThisYear = 0;

    const week = new Array(7).fill(0);

    jobs.reverse().forEach(({ created_at, progress }) => {
      progress.is_finished ? ++inFinished : ++inProgress;

      switch (progress.status) {
        case 'PENDING':
          ++pendings;
          break;
        case 'NEGATIVE':
          ++negatives;
          break;
        case 'POSITIVE':
          ++positives;
          break;
      }

      if (isThisWeek(created_at)) {
        ++applyThisWeek;
        const day = getDay(created_at);

        week[day] = ++week[day];
      }

      isToday(created_at) && ++applyToday;
      isThisMonth(created_at) && ++applyThisMouth;
      isThisYear(created_at) && ++applyThisYear;
    });

    const avg = +(week.reduce((p, c) => p + c) / 7).toFixed(2);
    const ranks = [
      { rank: 'F', gtr: 0, ltr: 1.0 },
      { rank: 'D', gtr: 1.0, ltr: 2.0 },
      { rank: 'C', gtr: 2.0, ltr: 3.0 },
      { rank: 'B', gtr: 3.0, ltr: 5.0 },
      { rank: 'A', gtr: 5.0, ltr: 7.0 },
      { rank: 'S', gtr: 7.0, ltr: 999 },
    ];
    const findRank = ranks.find(({ gtr, ltr }) => avg > gtr && avg < ltr);
    const weekRank = findRank ? findRank.rank : 'F';
    /*
      F -> 0.00 < avg < 1.00   (0)
      D -> 1.00 < avg < 2.00   (7)
      C -> 2.00 < avg < 3.00   (14)
      B -> 3.00 < avg < 4.00   (21)
      A -> 5.00 < avg < 7.00   (35)
      S -> 7.00 < avg < ∞      (50)
    */

    return {
      count: {
        total,
        in_progress: inProgress,
        in_finished: inFinished,
        pendings,
        negatives,
        positives,
      },
      apply: {
        today: applyToday,
        this_week: applyThisWeek,
        this_month: applyThisMouth,
        this_year: applyThisYear,
        week: {
          this_sunday: week[0],
          this_monday: week[1],
          this_tuesday: week[2],
          this_wednesday: week[3],
          this_thursday: week[4],
          this_friday: week[5],
          this_saturday: week[6],
        },
        week_avg: avg,
        week_rank: weekRank,
      },
    };
  }
}
