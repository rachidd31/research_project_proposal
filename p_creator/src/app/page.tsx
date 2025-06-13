"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { BookUser, BrainCircuit, Target, Users, DollarSign, Milestone, ChevronLeft, ChevronRight, Download, Printer, CheckCircle, Lightbulb } from 'lucide-react';

// --- Données et Configuration (Extraites du guide) ---
const STRATEGIC_AXES = [
  "Gestion de l'eau",
  "Phosphates et leurs dérivés (extraction, traitement, valorisation)",
  "Santé",
  "Sécurité alimentaire",
  "Énergies renouvelables et transition énergétique",
  "Sciences Humaines et Sociales (SHS)",
  "Changement climatique (adaptation et atténuation)",
  "Technologies avancées, industrie et transformation numérique (IA, Aéronautique, etc.)"
];

// --- Définitions des types de données ---
interface SpecificObjective {
  id: number;
  text: string;
}

interface TimelineItem {
  id: number;
  task: string;
  duration: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

interface BudgetItem {
  id: number;
  item: string;
  justification: string;
  cost: string;
}

interface ProposalData {
  title: string;
  acronym: string;
  abstract: string;
  keywords: string;
  strategicAxis: string;
  axisJustification: string;
  literatureReview: string;
  researchGap: string;
  mainObjective: string;
  specificObjectives: SpecificObjective[];
  methodology: string;
  timeline: TimelineItem[];
  expectedOutcomes: string;
  socioEconomicImpact: string;
  disseminationPlan: string;
  piName: string;
  piAffiliation: string;
  piEmail: string;
  teamMembers: TeamMember[];
  budgetItems: BudgetItem[];
}

// --- État initial du formulaire ---
const INITIAL_PROPOSAL_STATE: ProposalData = {
  title: '',
  acronym: '',
  abstract: '',
  keywords: '',
  strategicAxis: '',
  axisJustification: '',
  literatureReview: '',
  researchGap: '',
  mainObjective: '',
  specificObjectives: [{ id: 1, text: '' }],
  methodology: '',
  timeline: [{ id: 1, task: '', duration: '' }],
  expectedOutcomes: '',
  socioEconomicImpact: '',
  disseminationPlan: '',
  piName: '',
  piAffiliation: '',
  piEmail: '',
  teamMembers: [{ id: 1, name: '', role: '' }],
  budgetItems: [{ id: 1, item: '', justification: '', cost: '' }],
};

// --- Type pour les props des composants d'étape ---
interface StepProps {
    data: ProposalData;
    setData: React.Dispatch<React.SetStateAction<ProposalData>>;
}


// --- Composants de l'interface utilisateur ---

interface TooltipProps {
  text: string;
}

const Tooltip = ({ text }: TooltipProps) => (
  <span className="absolute left-1/2 -translate-x-1/2 -top-10 w-max max-w-xs p-2 text-xs text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
    {text}
  </span>
);

interface InputFieldProps {
  id: string;
  name?: string; // name should be optional as it's the same as id
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  tooltip?: string;
}

const InputField = ({ id, name, label, value, onChange, placeholder, type = 'text', tooltip }: InputFieldProps) => (
  <div className="relative w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative group flex items-center">
      {type === 'textarea' ? (
        <textarea id={id} name={name || id} value={value} onChange={onChange} placeholder={placeholder} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"></textarea>
      ) : (
        <input type={type} id={id} name={name || id} value={value} onChange={onChange} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
      )}
      {tooltip && (
        <div className="absolute right-3">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <Tooltip text={tooltip} />
        </div>
      )}
    </div>
  </div>
);

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper = ({ currentStep, totalSteps }: StepperProps) => (
  <div className="w-full mb-8">
    <div className="flex justify-between items-center">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${i + 1 <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {i + 1}
            </div>
          </div>
          {i < totalSteps - 1 && <div className={`flex-1 h-1 transition-all duration-300 ${i + 1 < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>}
        </React.Fragment>
      ))}
    </div>
  </div>
);


// --- Sections du Formulaire (Étapes) ---

const Step1_Basics: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center"><BookUser className="mr-2 text-indigo-600"/>Informations de Base</h2>
      <p className="text-gray-600">Commencez par les informations essentielles qui définiront votre projet. Le titre doit être concis et percutant.</p>
      <InputField id="title" label="Titre Complet du Projet" value={data.title} onChange={handleChange} placeholder="Ex: Développement de solutions de dessalement solaire à petite échelle..." tooltip="Le titre doit refléter clairement le sujet et l'objectif principal de votre recherche." />
      <InputField id="acronym" label="Acronyme du Projet" value={data.acronym} onChange={handleChange} placeholder="Ex: DESSOL" tooltip="Un acronyme court et mémorable est utile pour la communication." />
      <InputField id="abstract" label="Résumé du Projet (Abstract)" value={data.abstract} onChange={handleChange} type="textarea" placeholder="Décrivez en 250-300 mots le contexte, les objectifs, la méthodologie et l'impact attendu..." tooltip="Le résumé est souvent la première section lue par les évaluateurs. Il doit être clair, complet et convaincant." />
      <InputField id="keywords" label="Mots-clés" value={data.keywords} onChange={handleChange} placeholder="Ex: dessalement, énergie solaire, gestion de l'eau, Maroc..." tooltip="Choisissez 4 à 6 mots-clés pertinents qui permettront d'indexer votre projet." />
    </div>
  );
};

const Step2_Context: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center"><BrainCircuit className="mr-2 text-indigo-600"/>Contexte et Alignement Stratégique</h2>
      <p className="text-gray-600">Positionnez votre projet par rapport à l&apos;état de l&apos;art et aux priorités nationales.</p>

      <div className="relative w-full">
        <label htmlFor="strategicAxis" className="block text-sm font-medium text-gray-700 mb-1">Alignement avec les Axes Stratégiques Marocains</label>
        <div className="relative group flex items-center">
            <select id="strategicAxis" name="strategicAxis" value={data.strategicAxis} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
              <option value="">Sélectionnez un axe prioritaire...</option>
              {STRATEGIC_AXES.map(axis => <option key={axis} value={axis}>{axis}</option>)}
            </select>
            <div className="absolute right-3">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              <Tooltip text="Démontrer un alignement clair avec les priorités nationales (PNARDI, etc.) est un critère d'évaluation majeur." />
            </div>
        </div>
      </div>

      <InputField id="axisJustification" label="Justification de l&apos;Alignement" value={data.axisJustification} onChange={handleChange} type="textarea" placeholder="Expliquez en détail comment votre projet répond aux défis de l'axe stratégique sélectionné..." tooltip="Utilisez les mots-clés des documents officiels pour renforcer votre argumentation."/>
      <InputField id="literatureReview" label="État de l&apos;Art (Revue de la Littérature)" value={data.literatureReview} onChange={handleChange} type="textarea" placeholder="Synthétisez les recherches existantes sur le sujet. Montrez que vous maîtrisez le domaine..." tooltip="Une revue critique, et non une simple liste. Mettez en évidence les controverses et les limites des travaux précédents." />
      <InputField id="researchGap" label="Problématique et Lacune Scientifique" value={data.researchGap} onChange={handleChange} type="textarea" placeholder="Identifiez clairement le 'trou' dans les connaissances actuelles que votre projet vise à combler. Quelle est la question non résolue ?" tooltip="C'est la justification de l'originalité et de la nécessité de votre projet. Soyez explicite." />
    </div>
  );
};

const Step3_ProjectPlan: React.FC<StepProps> = ({ data, setData }) => {
  const handleObjectiveChange = (id: number, value: string) => {
    const newObjectives = data.specificObjectives.map(obj => obj.id === id ? { ...obj, text: value } : obj);
    setData(prev => ({ ...prev, specificObjectives: newObjectives }));
  };
  const addObjective = () => {
    const newId = (data.specificObjectives.length > 0 ? Math.max(...data.specificObjectives.map(o => o.id)) : 0) + 1;
    setData(prev => ({ ...prev, specificObjectives: [...prev.specificObjectives, { id: newId, text: '' }] }));
  };
  const removeObjective = (id: number) => {
    if (data.specificObjectives.length > 1) {
      setData(prev => ({ ...prev, specificObjectives: data.specificObjectives.filter(obj => obj.id !== id) }));
    }
  };

  const handleTimelineChange = (id: number, field: 'task' | 'duration', value: string) => {
    const newTimeline = data.timeline.map(item => item.id === id ? { ...item, [field]: value } : item);
    setData(prev => ({...prev, timeline: newTimeline}));
  }
  const addTimelineTask = () => {
     const newId = (data.timeline.length > 0 ? Math.max(...data.timeline.map(o => o.id)) : 0) + 1;
     setData(prev => ({...prev, timeline: [...prev.timeline, {id: newId, task: '', duration: ''}]}))
  }
  const removeTimelineTask = (id: number) => {
     if (data.timeline.length > 1) {
        setData(prev => ({...prev, timeline: data.timeline.filter(item => item.id !== id)}));
     }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Target className="mr-2 text-indigo-600"/>Objectifs et Méthodologie</h2>
      <p className="text-gray-600">Décrivez ce que vous comptez faire et comment vous allez le faire. La clarté et la rigueur sont essentielles ici.</p>

      <InputField id="mainObjective" name="mainObjective" label="Objectif Principal" value={data.mainObjective} onChange={(e) => setData(prev => ({...prev, mainObjective: e.target.value}))} type="textarea" placeholder="Décrivez le but ultime et global de votre projet en une ou deux phrases." tooltip="L'objectif principal est la 'destination' de votre recherche." />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Objectifs Spécifiques</label>
        <div className="space-y-2">
          {data.specificObjectives.map((obj, index) => (
            <div key={obj.id} className="flex items-center space-x-2">
              <span className="text-gray-500">{index + 1}.</span>
              <input type="text" value={obj.text} onChange={(e) => handleObjectiveChange(obj.id, e.target.value)} placeholder={`Objectif spécifique ${index + 1}`} className="flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
              <button onClick={() => removeObjective(obj.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full disabled:opacity-50" disabled={data.specificObjectives.length <= 1}>&times;</button>
            </div>
          ))}
          <button onClick={addObjective} className="text-sm text-indigo-600 hover:text-indigo-800">+ Ajouter un objectif</button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Les objectifs spécifiques sont les étapes mesurables (SMART) pour atteindre l&apos;objectif principal.</p>
      </div>

      <InputField id="methodology" name="methodology" label="Approche Méthodologique" value={data.methodology} onChange={(e) => setData(prev => ({...prev, methodology: e.target.value}))} type="textarea" placeholder="Décrivez en détail les méthodes, techniques, protocoles, analyses de données, etc. que vous utiliserez. Justifiez vos choix." tooltip="Cette section doit convaincre de la faisabilité et de la rigueur scientifique de votre projet. Mentionnez les stratégies alternatives en cas de difficultés." />
    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Chronogramme (Tâches Principales)</label>
         <div className="space-y-2">
          {data.timeline.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
              <input type="text" value={item.task} onChange={e => handleTimelineChange(item.id, 'task', e.target.value)} placeholder="Nom de la tâche (ex: Revue de littérature)" className="col-span-1 md:col-span-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm"/>
              <input type="text" value={item.duration} onChange={e => handleTimelineChange(item.id, 'duration', e.target.value)} placeholder="Durée (ex: Mois 1-3)" className="col-span-1 md:col-span-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm"/>
              <button onClick={() => removeTimelineTask(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full disabled:opacity-50" disabled={data.timeline.length <= 1}>&times;</button>
            </div>
          ))}
          <button onClick={addTimelineTask} className="text-sm text-indigo-600 hover:text-indigo-800">+ Ajouter une tâche</button>
        </div>
      </div>
    </div>
  );
};

const Step4_Impact: React.FC<StepProps> = ({ data, setData }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Milestone className="mr-2 text-indigo-600"/>Impact et Valorisation</h2>
      <p className="text-gray-600">Quels seront les résultats de votre projet et comment seront-ils diffusés et utilisés ?</p>
      <InputField id="expectedOutcomes" label="Résultats Attendus" value={data.expectedOutcomes} onChange={handleChange} type="textarea" placeholder="Listez les livrables concrets : publications, brevets, prototypes, bases de données, rapports, etc." tooltip="Soyez aussi précis que possible sur ce que le projet produira." />
      <InputField id="socioEconomicImpact" label="Impact Socio-économique et Environnemental" value={data.socioEconomicImpact} onChange={handleChange} type="textarea" placeholder="Expliquez comment votre projet contribuera au développement du Maroc : création d'emplois, compétitivité, politique publique, protection de l'environnement..." tooltip="C'est un critère crucial pour les financeurs marocains. Reliez l'impact à des problèmes concrets du pays." />
      <InputField id="disseminationPlan" label="Plan de Dissémination et de Valorisation" value={data.disseminationPlan} onChange={handleChange} type="textarea" placeholder="Comment allez-vous partager vos résultats ? (Conférences, articles, workshops, etc.). Comment envisagez-vous le transfert de technologie ?" tooltip="Un bon plan montre que vous pensez au-delà de la simple exécution du projet." />
    </div>
  );
};

const Step5_Team: React.FC<StepProps> = ({ data, setData }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleMemberChange = (id: number, field: 'name' | 'role', value: string) => {
        const newMembers = data.teamMembers.map(member => member.id === id ? { ...member, [field]: value } : member);
        setData(prev => ({ ...prev, teamMembers: newMembers }));
    };

    const addMember = () => {
        const newId = (data.teamMembers.length > 0 ? Math.max(...data.teamMembers.map(m => m.id)) : 0) + 1;
        setData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, { id: newId, name: '', role: '' }] }));
    };

    const removeMember = (id: number) => {
        if (data.teamMembers.length > 1) {
            setData(prev => ({ ...prev, teamMembers: data.teamMembers.filter(member => member.id !== id) }));
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Users className="mr-2 text-indigo-600"/>Équipe du Projet</h2>
            <p className="text-gray-600">Présentez le porteur du projet et les membres clés de l&apos;équipe. Mettez en avant la complémentarité des expertises.</p>
            
            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg text-gray-700">Porteur de Projet (Principal Investigator)</h3>
                 <InputField id="piName" label="Nom et Prénom" value={data.piName} onChange={handleChange} placeholder="Nom du porteur de projet" />
                 <InputField id="piAffiliation" label="Institution de Rattachement" value={data.piAffiliation} onChange={handleChange} placeholder="Université, Centre de recherche..." />
                 <InputField id="piEmail" label="Email Professionnel" value={data.piEmail} onChange={handleChange} placeholder="contact@institution.ma" type="email" />
            </div>

            <div className="p-4 border rounded-lg space-y-4">
                <h3 className="font-semibold text-lg text-gray-700">Membres de l&apos;Équipe</h3>
                <div className="space-y-2">
                    {data.teamMembers.map((member) => (
                        <div key={member.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                            <input type="text" value={member.name} onChange={e => handleMemberChange(member.id, 'name', e.target.value)} placeholder="Nom du membre" className="col-span-1 md:col-span-3 px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
                            <input type="text" value={member.role} onChange={e => handleMemberChange(member.id, 'role', e.target.value)} placeholder="Rôle (ex: Post-doctorant, Doctorant, Technicien)" className="col-span-1 md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
                            <button onClick={() => removeMember(member.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full disabled:opacity-50" disabled={data.teamMembers.length <= 1}>&times;</button>
                        </div>
                    ))}
                </div>
                <button onClick={addMember} className="text-sm text-indigo-600 hover:text-indigo-800">+ Ajouter un membre</button>
            </div>
        </div>
    );
};

const Step6_Budget: React.FC<StepProps> = ({ data, setData }) => {
    const handleBudgetChange = (id: number, field: 'item' | 'justification' | 'cost', value: string) => {
        const newItems = data.budgetItems.map(item => item.id === id ? { ...item, [field]: value } : item);
        setData(prev => ({ ...prev, budgetItems: newItems }));
    };

    const addBudgetItem = () => {
        const newId = (data.budgetItems.length > 0 ? Math.max(...data.budgetItems.map(i => i.id)) : 0) + 1;
        setData(prev => ({ ...prev, budgetItems: [...prev.budgetItems, { id: newId, item: '', justification: '', cost: '' }] }));
    };

    const removeBudgetItem = (id: number) => {
        if (data.budgetItems.length > 1) {
            setData(prev => ({ ...prev, budgetItems: data.budgetItems.filter(item => item.id !== id) }));
        }
    };
    
    const totalCost = data.budgetItems.reduce((acc, item) => acc + (parseFloat(item.cost) || 0), 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><DollarSign className="mr-2 text-indigo-600"/>Budget Prévisionnel</h2>
            <p className="text-gray-600">Détaillez les coûts associés à votre projet. Chaque dépense doit être justifiée par rapport aux activités du projet.</p>

            <div className="space-y-2">
                <div className="hidden md:grid grid-cols-8 gap-2 font-semibold text-sm text-gray-600">
                    <div className="col-span-3">Poste de Dépense</div>
                    <div className="col-span-3">Justification</div>
                    <div className="col-span-2">Coût (MAD)</div>
                </div>
                {data.budgetItems.map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-8 gap-2 items-center">
                        <input type="text" value={item.item} onChange={e => handleBudgetChange(item.id, 'item', e.target.value)} placeholder="Ex: Equipement (Spectromètre)" className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
                        <input type="text" value={item.justification} onChange={e => handleBudgetChange(item.id, 'justification', e.target.value)} placeholder="Justification (essentiel pour l'analyse X)" className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
                        <input type="number" value={item.cost} onChange={e => handleBudgetChange(item.id, 'cost', e.target.value)} placeholder="Coût en MAD" className="md:col-span-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm" />
                        <button onClick={() => removeBudgetItem(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full disabled:opacity-50" disabled={data.budgetItems.length <= 1}>&times;</button>
                    </div>
                ))}
            </div>
            <button onClick={addBudgetItem} className="text-sm text-indigo-600 hover:text-indigo-800">+ Ajouter une ligne budgétaire</button>

            <div className="flex justify-end mt-4">
                <div className="text-lg font-bold text-gray-800 p-3 bg-gray-100 rounded-lg">
                    Coût Total Estimé: {totalCost.toLocaleString('fr-MA')} MAD
                </div>
            </div>
             <p className="text-xs text-gray-500 mt-1">Vérifiez les catégories de dépenses éligibles/inéligibles dans l&apos;appel à projets. Soyez réaliste.</p>
        </div>
    );
};

interface ReviewStepProps {
    data: ProposalData;
}

const Step7_Review = ({ data }: ReviewStepProps) => {
    const proposalRef = React.useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const formatProposal = () => {
        let text = `PROPOSITION DE PROJET DE RECHERCHE\n===================================\n\n`;
        text += `1. INFORMATIONS DE BASE\n-----------------------\n`;
        text += `Titre du projet: ${data.title}\n`;
        text += `Acronyme: ${data.acronym}\n`;
        text += `Mots-clés: ${data.keywords}\n\n`;
        text += `Résumé:\n${data.abstract}\n\n`;

        text += `2. CONTEXTE ET ALIGNEMENT STRATÉGIQUE\n---------------------------------------\n`;
        text += `Axe Stratégique Marocain: ${data.strategicAxis}\n`;
        text += `Justification de l'alignement:\n${data.axisJustification}\n\n`;
        text += `État de l'art:\n${data.literatureReview}\n\n`;
        text += `Problématique et lacune scientifique:\n${data.researchGap}\n\n`;

        text += `3. OBJECTIFS ET MÉTHODOLOGIE\n----------------------------\n`;
        text += `Objectif Principal:\n${data.mainObjective}\n\n`;
        text += `Objectifs Spécifiques:\n`;
        data.specificObjectives.forEach((o, i) => text += `${i + 1}. ${o.text}\n`);
        text += `\nApproche Méthodologique:\n${data.methodology}\n\n`;
        text += `Chronogramme:\n`;
        data.timeline.forEach(t => text += `- ${t.task} (${t.duration})\n`);
        text += `\n`;
        
        text += `4. IMPACT ET VALORISATION\n--------------------------\n`;
        text += `Résultats Attendus:\n${data.expectedOutcomes}\n\n`;
        text += `Impact Socio-économique:\n${data.socioEconomicImpact}\n\n`;
        text += `Plan de Dissémination et Valorisation:\n${data.disseminationPlan}\n\n`;

        text += `5. ÉQUIPE DU PROJET\n--------------------\n`;
        text += `Porteur de Projet:\n- Nom: ${data.piName}\n- Institution: ${data.piAffiliation}\n- Email: ${data.piEmail}\n\n`;
        text += `Membres de l'équipe:\n`;
        data.teamMembers.forEach(m => text += `- ${m.name} (${m.role})\n`);
        text += `\n`;

        text += `6. BUDGET PRÉVISIONNEL\n-----------------------\n`;
        const totalCost = data.budgetItems.reduce((acc, item) => acc + (parseFloat(item.cost) || 0), 0);
        data.budgetItems.forEach(i => text += `- ${i.item}: ${i.cost} MAD (Justification: ${i.justification})\n`);
        text += `\nCOÛT TOTAL ESTIMÉ: ${totalCost.toLocaleString('fr-MA')} MAD\n`;

        return text;
    };

    const handleCopy = () => {
        const proposalText = formatProposal();
        const textArea = document.createElement('textarea');
        textArea.value = proposalText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };

    const handlePrint = () => {
        if(proposalRef.current) {
            const printableContent = proposalRef.current.innerHTML;
            const printWindow = window.open('', '', 'height=600,width=800');
            if(printWindow) {
                printWindow.document.write('<html><head><title>Proposition de Projet</title>');
                printWindow.document.write('<style>body{font-family: sans-serif; line-height: 1.5;} h1,h2,h3{color: #333;} h2{border-bottom: 1px solid #eee; padding-bottom: 5px;} table{width: 100%; border-collapse: collapse;} th,td{border: 1px solid #ddd; padding: 8px; text-align: left;}</style>');
                printWindow.document.write('</head><body>');
                printWindow.document.write(printableContent);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    const totalCost = data.budgetItems.reduce((acc, item) => acc + (parseFloat(item.cost) || 0), 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center"><CheckCircle className="mr-2 text-green-500" />Révision et Exportation</h2>
                <div className="flex space-x-2">
                    <button onClick={handleCopy} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                        <Download className="mr-2 h-4 w-4" /> {copied ? 'Copié !' : 'Copier le Texte'}
                    </button>
                    <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
                        <Printer className="mr-2 h-4 w-4" /> Imprimer
                    </button>
                </div>
            </div>
            <p className="text-gray-600">Veuillez relire attentivement toutes les sections de votre proposition. C&apos;est la dernière étape avant l&apos;exportation. Une relecture par un collègue est fortement recommandée.</p>

            <div ref={proposalRef} className="p-6 bg-white border border-gray-200 rounded-lg shadow-inner space-y-8 text-gray-800">
                <h1 className="text-center text-2xl font-bold mb-4">{data.title || "Titre du Projet"}</h1>
                
                <section>
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">1. Informations de Base</h3>
                    <p><strong>Acronyme:</strong> {data.acronym}</p>
                    <p><strong>Mots-clés:</strong> {data.keywords}</p>
                    <p className="mt-2"><strong>Résumé:</strong><br/>{data.abstract.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </section>
                
                <section>
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">2. Contexte et Alignement Stratégique</h3>
                    <p><strong>Axe Stratégique:</strong> {data.strategicAxis}</p>
                    <p className="mt-2"><strong>Justification:</strong><br/>{data.axisJustification.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                    <p className="mt-2"><strong>État de l&apos;art:</strong><br/>{data.literatureReview.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                    <p className="mt-2"><strong>Problématique:</strong><br/>{data.researchGap.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </section>

                <section>
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">3. Objectifs et Plan du Projet</h3>
                    <p className="mt-2"><strong>Objectif Principal:</strong><br/>{data.mainObjective}</p>
                    <p className="mt-2"><strong>Objectifs Spécifiques:</strong></p>
                    <ul className="list-disc list-inside ml-4">{data.specificObjectives.map(o => <li key={o.id}>{o.text}</li>)}</ul>
                    <p className="mt-2"><strong>Méthodologie:</strong><br/>{data.methodology.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                    <p className="mt-2"><strong>Chronogramme:</strong></p>
                    <ul className="list-disc list-inside ml-4">{data.timeline.map(t => <li key={t.id}>{t.task} ({t.duration})</li>)}</ul>
                </section>
                
                 <section>
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">4. Impact et Valorisation</h3>
                    <p className="mt-2"><strong>Résultats Attendus:</strong><br/>{data.expectedOutcomes.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                    <p className="mt-2"><strong>Impact Socio-économique:</strong><br/>{data.socioEconomicImpact.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                    <p className="mt-2"><strong>Plan de Dissémination:</strong><br/>{data.disseminationPlan.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </section>

                <section>
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">5. Équipe du Projet</h3>
                     <p><strong>Porteur de Projet:</strong> {data.piName} ({data.piAffiliation}, {data.piEmail})</p>
                     <p className="mt-2"><strong>Membres:</strong></p>
                     <ul className="list-disc list-inside ml-4">{data.teamMembers.map(m => <li key={m.id}>{m.name} - {m.role}</li>)}</ul>
                </section>
                
                <section>
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">6. Budget</h3>
                    <table className="w-full text-sm">
                        <thead><tr className="bg-gray-100"><th className="p-2">Poste</th><th className="p-2">Justification</th><th className="p-2 text-right">Coût (MAD)</th></tr></thead>
                        <tbody>
                            {data.budgetItems.map(i => <tr key={i.id}><td className="p-2">{i.item}</td><td className="p-2">{i.justification}</td><td className="p-2 text-right">{parseFloat(i.cost || "0").toLocaleString('fr-MA')}</td></tr>)}
                        </tbody>
                        <tfoot><tr className="font-bold bg-gray-100"><td colSpan={2} className="p-2 text-right">TOTAL</td><td className="p-2 text-right">{totalCost.toLocaleString('fr-MA')}</td></tr></tfoot>
                    </table>
                </section>
            </div>
        </div>
    );
};


// --- Composant Principal de l'Application ---

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [proposalData, setProposalData] = useState<ProposalData>(INITIAL_PROPOSAL_STATE);
  const totalSteps = 7;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);


  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1_Basics data={proposalData} setData={setProposalData} />;
      case 2: return <Step2_Context data={proposalData} setData={setProposalData} />;
      case 3: return <Step3_ProjectPlan data={proposalData} setData={setProposalData} />;
      case 4: return <Step4_Impact data={proposalData} setData={setProposalData} />;
      case 5: return <Step5_Team data={proposalData} setData={setProposalData} />;
      case 6: return <Step6_Budget data={proposalData} setData={setProposalData} />;
      case 7: return <Step7_Review data={proposalData} />;
      default: return <Step1_Basics data={proposalData} setData={setProposalData} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Assistant de Proposition de Projet</h1>
          <p className="text-lg text-gray-600 mt-2">Concevez une proposition percutante et alignée sur les standards marocains et internationaux.</p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <Stepper currentStep={currentStep} totalSteps={totalSteps} />
          <div className="mt-8">
            {renderStep()}
          </div>
          
          <div className="mt-10 pt-6 border-t flex justify-between items-center">
             <button
               onClick={prevStep}
               disabled={currentStep === 1}
               className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
             >
               <ChevronLeft className="mr-2 h-5 w-5" /> Précédent
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Suivant <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            ) : (
                 <button
                onClick={()=> setCurrentStep(1)}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Recommencer
              </button>
            )}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-sm text-gray-500">
            <p>&copy; 2025 - Outil développé pour assister les chercheurs au Maroc.</p>
        </footer>
      </div>
    </div>
  );
}
