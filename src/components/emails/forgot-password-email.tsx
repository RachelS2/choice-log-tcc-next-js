import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
    username: string;
    resetUrl: string;
    userEmail: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
    const { username, resetUrl, userEmail } = props;

    return (
        <Html dir="ltr" lang="pt-BR">
            <Tailwind>
                <Head />
                <Preview>Redefina sua senha - Ação necessária</Preview>
                <Body className="py-[40px] font-sans">
                    <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
                        {/* Header */}
                        <Section className="mb-[32px] text-center">
                            <Heading className="m-0 mb-[8px] font-bold text-[28px] text-gray-900">
                                Redefinir sua senha
                            </Heading>
                            <Text className="m-0 text-[16px] text-gray-600">
                                Recebemos uma solicitação para redefinir sua senha
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="m-0 mb-[16px] text-[16px] text-gray-700 leading-[24px]">
                                Olá, {username}
                            </Text>
                            <Text className="m-0 mb-[16px] text-[16px] text-gray-700 leading-[24px]">
                                Recebemos uma solicitação de redefinição de senha para sua conta associada a <strong>{userEmail}</strong>.
                            </Text>
                            <Text className="m-0 mb-[24px] text-[16px] text-gray-700 leading-[24px]">
                                Clique no botão abaixo para criar uma nova senha. Este link expirará em 30 minutos por motivos de segurança.
                            </Text>
                        </Section>

                        {/* Reset Button */}
                        <Section className="mb-[32px] text-center">
                            <Button
                                className="box-border inline-block rounded-[8px] bg-blue-600 px-[32px] py-[16px] font-semibold text-[16px] text-white no-underline"
                                href={resetUrl}
                            >
                                Redefinir senha
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="m-0 mb-[8px] text-[14px] text-gray-600 leading-[20px]">
                                Se o botão não funcionar, copie e cole este link no seu navegador:
                            </Text>
                            <Link
                                className="break-all text-[14px] text-blue-600"
                                href={resetUrl}
                            >
                                {resetUrl}
                            </Link>
                        </Section>

                        {/* Security Notice */}
                        <Section className="mb-[32px] rounded-[8px] bg-gray-50 p-[20px]">
                            <Text className="m-0 mb-[8px] font-semibold text-[14px] text-gray-700 leading-[20px]">
                                Aviso de segurança:
                            </Text>
                            <Text className="m-0 mb-[8px] text-[14px] text-gray-600 leading-[20px]">
                                • Se você não solicitou a redefinição de senha, ignore este e-mail
                            </Text>
                            <Text className="m-0 mb-[8px] text-[14px] text-gray-600 leading-[20px]">
                                • Este link expirará em 30 minutos
                            </Text>
                            <Text className="m-0 text-[14px] text-gray-600 leading-[20px]">
                                • Por segurança, nunca compartilhe este link com ninguém
                            </Text>
                        </Section>

                        {/* Help Section */}
                        <Section className="mb-[32px]">
                            <Text className="m-0 text-[14px] text-gray-600 leading-[20px]">
                                Precisa de ajuda? Entre em contato com a desenvolvedora: {" "}
                                <Link
                                    className="text-blue-600"
                                    href="mailto:rachelbs@id.uff.br"
                                >
                                    rachelbs@id.uff.br
                                </Link>
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-gray-200 border-t pt-[24px]">
                            <Text className="m-0 text-center text-[12px] text-gray-400 leading-[16px]">
                                Choice Log
                                <br />
                                Feito por Rachel Barino Silva como Trabalho de Conclusão de Curso (TCC) do curso de Sistemas de Informação da Universidade Federal Fluminense (UFF)
                                <br />
                                Niterói, Rio de Janeiro - Brasil
                            </Text>

                            <Text className="m-0 mt-[8px] text-center text-[12px] text-gray-400 leading-[16px]">
                                © 2026 Choice Log. Todos os direitos reservados.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ForgotPasswordEmail;