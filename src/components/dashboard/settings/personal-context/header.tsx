import { PageHeader, PageSubtitle, PageTitle } from "@/components/ui/pages-title";

export default function ProfileSettingsHeader() {
    return (
        <div className="mb-5 flex flex-col">
            <PageHeader header="Gerencie suas informações pessoais e preferências da conta." lineBefore lineAfter />
            <PageTitle title="Seu perfil" className="text-sm"/>
        </div>
    );

}