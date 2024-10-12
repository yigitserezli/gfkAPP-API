import Student from "../models/Students.js";
import getLatestFee from "./FeeSettingService.js";

const getStatistics = async () => {
    try {
        const students = await Student.find();

        // Mevcut ay ve yıl bilgisi
        const today = new Date();
        const currentMonth = today.toLocaleString("default", { month: "long" }); // Ayın İngilizce ismi
        const currentYear = today.getFullYear(); // Mevcut yıl

        //TOTAL STUDENTS COUNT
        const totalStudents = students.length;

        //ENROLLED STUDENTS IN LAST 30 DAYS
        const studentsInLast30Days = students.filter((student) => {
            const createdAt = new Date(student.createdAt);
            const diffInDays = (today - createdAt) / (1000 * 60 * 60 * 24); // Milisaniyeden gün farkı
            return diffInDays <= 30;
        }).length;

        //GRUP STUDENTS ACCORDING TO THEIR AGE CATEGORIES
        const ageCategoryCounts = students.reduce((acc, student) => {
            const ageCategory = student.ageCategory;
            acc[ageCategory] = (acc[ageCategory] || 0) + 1; // Yaş kategorisine göre sayıları topluyoruz
            return acc;
        }, {});

        //MOST CROWDED
        const mostCrowdedAgeCategory = Object.keys(ageCategoryCounts).reduce((a, b) => (ageCategoryCounts[a] > ageCategoryCounts[b] ? a : b));

        //LOWEST CROWDED
        const lowestCrowdedAgeCategory = Object.keys(ageCategoryCounts).reduce((a, b) => (ageCategoryCounts[a] < ageCategoryCounts[b] ? a : b));

        //PAYMENT STATISTICS//

        //CURRENT MONTH FEE
        const latestFee = await getLatestFee();
        console.log(latestFee);

        //EXPECTED MONTHLY INCOME
        const expectedIncome = totalStudents * latestFee;

        // Mevcut ay için ödeme yapmış öğrenciler
        const alreadyPaidStudents = students.filter((student) => {
            return student.payments.some((paymentYear) => {
                // Yıl kontrolü
                if (paymentYear.year === currentYear) {
                    // Ay kontrolü (mevcut ay)
                    return paymentYear.months.some((month) => month.name === currentMonth && month.isPaid);
                }
                return false;
            });
        }).length;

        // Mevcut ay için ödeme yapmamış öğrenciler
        const notPayYetStudents = totalStudents - alreadyPaidStudents;

        // Toplanan toplam gelir (mevcut ay ödemelerine göre)
        const totalIncome = students.reduce((acc, student) => {
            const totalPaid = student.payments.reduce((sum, paymentYear) => {
                if (paymentYear.year === currentYear) {
                    // Mevcut ay için ödeme yapılıp yapılmadığını kontrol et
                    const monthSum = paymentYear.months.reduce((monthTotal, month) => {
                        return month.name === currentMonth && month.isPaid ? monthTotal + month.amount : monthTotal;
                    }, 0);
                    return sum + monthSum;
                }
                return sum;
            }, 0);
            return acc + totalPaid;
        }, 0);

        // Mevcut ay için toplanmamış gelir
        const willBeTakenIncome = expectedIncome - totalIncome;

        return {
            totalStudents,
            studentsInLast30Days,
            ageCategoryCounts,
            mostCrowdedAgeCategory,
            lowestCrowdedAgeCategory,
            expectedIncome, // Mevcut ay için beklenen gelir
            alreadyPaidStudents, // Mevcut ay için ödeme yapmış öğrenciler
            notPayYetStudents, // Mevcut ay için ödeme yapmamış öğrenciler
            totalIncome, // Mevcut ayda toplanan toplam ödeme
            willBeTakenIncome, // Mevcut ayda toplanmamış gelir
        };
    } catch (error) {
        throw new Error("İstatistikler hesaplanırken bir hata oluştu.");
    }
};

export default getStatistics;
