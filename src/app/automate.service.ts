import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { gemini } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AutomateService {
   
   genAI = new GoogleGenerativeAI(gemini.API_KEY);

   
  constructor() { }
  

  async  get_response(prompt : string) : Promise<string>{
    
  
   
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    /*const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();*/
    const chatSession = model.startChat({
      
  
      history: [
        {
          role: "user",
          parts: [
            {text: "voici le data que vous devez repondre sur , et vous devez repondre seulement aux questions liees au data que je vais vous fournir et merci "},
            {text: "voici le data de l'absence \n* TauxAcceptation\nTauxAcceptationEnPourcentage\n66.3%\n\n*tauxRefus\nTauxRefusEnPourcentage\n34%\n\f\n*TauxAbsenthéisme \nTauxAbsenteismeEnPourcentage\n38%\n\f\f* NombreTotalDeJoursParGrade\n               Count of\nDescription    DureeAbs\nSenior                22\nJunior                20\nSenior\nManager               19\nDirector/Master       16\nPartner               13\nConfirmé              12\n\n*NmbreTotalDeJoursParType \nDescription,Count of DureeAbs\nMaladie,15\nCongé d'études,10\nCongé de formation,9\nCongé sans solde,9\nCongé pour événements familiaux,6\nCongé parental,4\nCongé annuel,3\nCongé de mariage,3\nCongé de maternité/paternité,2\nCongé sabbatique,2\n\n*NmbreTotalDeJoursParAbsence\n\nSite,Count of DureeAbs\nTunis,22\nParis,20\nLondres,15\nDubai,14\nLisbonne,14\nMadrid,14\nFrancfort,13\nGand,13\nSingapour,13\nCasablanca,12\nDallas,11\n\n*moyenneJoursTravailles\nnbrjoursdetravail\n234\n\n*MoyenneDureeAbsenceParDepartement\n\nDepartement,Average of DureeAbs\n,27.97\nHuman Ressources,27.76\nOperations,26.46\nMarketing et Communication,26.35\nFinance,25.80\nIT System Department,25.02\n\n*MoyenneDureeAbsence \nGenre,Average of DureeAbs\nFemme,26.43\nHomme,25.78\n\n*AbsenceMoyenne \nAverage of DureeAbs\n26.04\n\n\f"},
            {text: "voici le data des employés"},
            {text: "* Moyenne d'ancienneté\nSum of AncienneteEnAnnees\n6\n\n*Moyenne de salaire initiale par Grade \nDescription,Average of Salaire initial\nPartner,15033.333333333334\nDirector/Master,11884.615384615385\nSenior Manager,8413.920265780731\nSenior,7355.359477124183\nJunior,4759.602510460251\nConfirmé,3620.359281437126\n\n*Nombre total des employés par Grade \nDescription,Count of Id_Employe_Sys\nJunior,478\nSenior,306\nSenior Manager,301\nConfirmé,167\nDirector/Master,91\nPartner,33\n\n\n*Nombre total des employés par site\nSite,Count of Id_Employe_Sys\nParis,646\nTunis,318\nCasablanca,161\nFrancfort,64\nGand,51\nLondres,36\nDubai,31\nMadrid,24\nDallas,20\nLisbonne,16\nSingapour,9\n\n\n*pourcentage Femmes\nPourcentageFemmes\n36%\n\n*pourcentage Hommes\nPourcentageHommes\n64%\n\n\n*Ratio HF pour poste Direction\n\nRatioHommeFemmeDirecteurs\n1.785425101214575\n\n\n*Taux du rotation du personnel (Turnover)\n\nTauxRotationGlobalEnPourcentage\n33%\n\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "##  Analyse des données sur les absences et les employés\n\nVoici une analyse des données que vous avez fournies. Veuillez noter que je ne peux répondre qu'aux questions qui peuvent être déduites de ces données.\n\n**Données sur les absences**\n\n* **Taux d'acceptation des demandes d'absence:** 66.3% des demandes d'absence sont acceptées.\n* **Taux de refus des demandes d'absence:** 34% des demandes d'absence sont refusées.\n* **Taux d'absentéisme:** 38% des employés sont absents en moyenne.\n\n**Analyse par grade:**\n\n* **Nombre total de jours d'absence par grade:** Les Seniors ont le plus grand nombre de jours d'absence (22 jours), suivis des Juniors (20 jours). \n* **Moyenne d'ancienneté par grade:**  Les Partners ont la plus grande moyenne d'ancienneté (6 ans), suivis des Directors/Masters.\n* **Moyenne de salaire initial par grade:** Les Partners ont le salaire initial le plus élevé (15033.33), suivis des Directors/Masters.\n\n**Analyse par type d'absence:**\n\n* **Nombre total de jours d'absence par type d'absence:** Les absences pour maladie sont les plus fréquentes (15 jours), suivies des congés d'études.\n\n**Analyse par site:**\n\n* **Nombre total de jours d'absence par site:** Tunis a le plus grand nombre de jours d'absence (22 jours), suivi de Paris.\n* **Nombre total des employés par site:** Paris a le plus grand nombre d'employés (646), suivi de Tunis.\n\n**Analyse par genre:**\n\n* **Moyenne de durée d'absence par genre:** Les femmes ont une durée d'absence moyenne légèrement supérieure (26.43 jours) par rapport aux hommes (25.78 jours).\n* **Pourcentage de femmes:** 36% des employés sont des femmes.\n* **Pourcentage d'hommes:** 64% des employés sont des hommes.\n\n**Autres données:**\n\n* **Nombre total de jours travaillés:** 234 jours.\n* **Moyenne de durée d'absence:** 26.04 jours.\n* **Moyenne de durée d'absence par département:** Les départements des Ressources Humaines et des Opérations ont la plus grande moyenne de durée d'absence.\n* **Ratio homme/femme pour les postes de direction:**  Il y a 1.78 homme pour chaque femme aux postes de direction.\n* **Taux de rotation du personnel:** 33% des employés ont quitté l'entreprise.\n\n**Observations et questions:**\n\n* La corrélation entre le taux d'absentéisme et la moyenne de durée d'absence par grade mérite d'être examinée. Est-ce que les grades ayant un taux d'absentéisme plus élevé ont également une moyenne de durée d'absence plus élevée?\n* Il serait intéressant d'analyser la distribution des types d'absence par site et par grade pour comprendre les tendances d'absentéisme spécifiques à chaque site et à chaque grade.\n* La différence de durée d'absence moyenne entre les femmes et les hommes est-elle significative? Existe-t-il des facteurs spécifiques qui expliquent cette différence?\n* Le taux de rotation du personnel est-il lié à la durée d'absence? Est-ce que les employés qui sont absents plus longtemps sont plus susceptibles de quitter l'entreprise?\n\n**Conclusion:**\n\nCes données offrent un aperçu précieux de l'absentéisme, de la composition des employés et de la rotation du personnel.  Une analyse plus approfondie est nécessaire pour identifier les tendances et les facteurs clés qui influencent ces paramètres. \n"},
          ],
        },
      ],
    });
    let result = await chatSession.sendMessage(prompt);
    
    return result.response.text();
    
  }
  
  
}
