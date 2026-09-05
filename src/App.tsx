import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { CyberBackgroundCanvas } from './components/CyberBackgroundCanvas';
import { SitePreloader } from './components/SitePreloader';
import { MorphXFilter } from './components/MorphXFilter';
import { MorphXFullpage, type SectionItem } from './components/MorphXFullpage';
import { VerdictChatProvider } from './context/VerdictChatContext';
import { VerdictChatbot } from './components/chat/VerdictChatbot';
import { ChatTriggerButton } from './components/chat/ChatTriggerButton';

// 20 Complete Presentation & Deployment Sections
import { Section01Hero } from './sections/Section01Hero';
import { Section02Problem } from './sections/Section02Problem';
import { Section03Motivation } from './sections/Section03Motivation';
import { Section04Architecture } from './sections/Section04Architecture';
import { Section05URLModel } from './sections/Section05URLModel';
import { Section06HTMLModel } from './sections/Section06HTMLModel';
import { Section07PaymentModel } from './sections/Section07PaymentModel';
import { Section08DatasetScan } from './sections/Section08DatasetScan';
import { Section09Dataset } from './sections/Section09Dataset';
import { Section10Performance } from './sections/Section10Performance';
import { Section11RiskEngine } from './sections/Section11RiskEngine';
import { Section12Explainability } from './sections/Section12Explainability';
import { Section13UserFlow } from './sections/Section13UserFlow';
import { Section14Personas } from './sections/Section14Personas';
import { Section15UseCase } from './sections/Section15UseCase';
import { Section16Limitations } from './sections/Section16Limitations';
import { Section17FutureWork } from './sections/Section17FutureWork';
import { Section18InteractiveDemo } from './sections/Section18InteractiveDemo';
import { Section19DownloadHub } from './sections/Section19DownloadHub';
import { Section20FinalStatement } from './sections/Section20FinalStatement';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sections: SectionItem[] = useMemo(
    () => [
      {
        id: 'hero',
        name: 'Overview',
        component: (
          <Section01Hero
            onScrollToExplore={() => setActiveSection('problem')}
            onNavigateToDownload={() => setActiveSection('download')}
          />
        ),
      },
      {
        id: 'problem',
        name: 'Threat Model',
        component: <Section02Problem />,
      },
      {
        id: 'motivation',
        name: 'Transport vs Trust',
        component: <Section03Motivation />,
      },
      {
        id: 'architecture',
        name: 'Architecture',
        component: <Section04Architecture />,
      },
      {
        id: 'url-ai',
        name: 'URL Model',
        component: <Section05URLModel />,
      },
      {
        id: 'html-ai',
        name: 'HTML Model',
        component: <Section06HTMLModel />,
      },
      {
        id: 'payment-ai',
        name: 'Payment AI',
        component: <Section07PaymentModel />,
      },
      {
        id: 'dataset-scan',
        name: 'Dataset Scan',
        component: <Section08DatasetScan />,
      },
      {
        id: 'dataset',
        name: 'Corpus Split',
        component: <Section09Dataset />,
      },
      {
        id: 'performance',
        name: 'Performance',
        component: <Section10Performance />,
      },
      {
        id: 'risk-engine',
        name: 'Risk Fusion',
        component: <Section11RiskEngine />,
      },
      {
        id: 'explainability',
        name: 'Explainability',
        component: <Section12Explainability />,
      },
      {
        id: 'user-flow',
        name: 'User Flow',
        component: <Section13UserFlow />,
      },
      {
        id: 'personas',
        name: 'Ecosystem',
        component: <Section14Personas />,
      },
      {
        id: 'use-case',
        name: 'Use Case',
        component: <Section15UseCase />,
      },
      {
        id: 'limitations',
        name: 'Limitations',
        component: <Section16Limitations />,
      },
      {
        id: 'future',
        name: 'Roadmap',
        component: <Section17FutureWork />,
      },
      {
        id: 'demo',
        name: 'Simulation Demo',
        component: <Section18InteractiveDemo onNavigateToDownload={() => setActiveSection('download')} />,
      },
      {
        id: 'download',
        name: 'Get Verdict',
        component: <Section19DownloadHub />,
      },
      {
        id: 'final',
        name: 'Conclusion',
        component: (
          <Section20FinalStatement
            onScrollToTop={() => setActiveSection('hero')}
            onNavigateToDownload={() => setActiveSection('download')}
          />
        ),
      },
    ],
    []
  );

  return (
    <VerdictChatProvider>
      <div className="h-screen w-screen overflow-hidden bg-[#05070d] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300 relative font-sans">
        
        {/* MorphX Shader Filter Layer */}
        <MorphXFilter />

        {/* Site Preloader Screen */}
        <AnimatePresence mode="wait">
          {isLoading && <SitePreloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {/* Interactive Cyber Background Particle Canvas */}
        <CyberBackgroundCanvas />

        {/* Pinned Fixed Floating Island Header */}
        <Navbar activeSection={activeSection} onNavigate={(secId) => setActiveSection(secId)} />

        {/* Fullpage MorphX Transition Container */}
        <MorphXFullpage
          sections={sections}
          activeSectionId={activeSection}
          onSectionChange={(id) => setActiveSection(id)}
        />

        {/* Verdict Intelligence AI Security Assistant */}
        <VerdictChatbot />

        {/* Floating SOC Assistant Trigger Button */}
        <ChatTriggerButton />

      </div>
    </VerdictChatProvider>
  );
}

export default App;

