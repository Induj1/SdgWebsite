import React from 'react';

interface EmailTemplateProps {
  name: string;
  projectTitle: string;
  submissionId: string;
  status: 'confirmation' | 'update' | 'selected' | 'completed';
  message?: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  projectTitle,
  submissionId,
  status,
  message
}) => {
  const getSubject = () => {
    switch (status) {
      case 'confirmation':
        return `✅ Project Submission Confirmed - ${submissionId}`;
      case 'update':
        return `📋 Project Update - ${projectTitle}`;
      case 'selected':
        return `🎉 Congratulations! Your project has been selected - ${projectTitle}`;
      case 'completed':
        return `🏆 Project Completed Successfully - ${projectTitle}`;
      default:
        return `MIT-BLR SDG Club - Project Update`;
    }
  };

  const getEmailContent = () => {
    switch (status) {
      case 'confirmation':
        return {
          title: '🎉 Thank you for your submission!',
          content: `
            <p>Hi ${name},</p>
            <p>Thank you for pitching your idea '<strong>${projectTitle}</strong>' to the MIT-BLR SDG Club. We're excited to review your proposal!</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0; color: #374151;">Submission Details:</h3>
              <p style="margin: 5px 0;"><strong>Project ID:</strong> ${submissionId}</p>
              <p style="margin: 5px 0;"><strong>Project Title:</strong> ${projectTitle}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #3b82f6;">📥 Received</span></p>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
              <li>Our evaluation team will review your submission within <strong>2 weeks</strong></li>
              <li>You can track your progress anytime at: <a href="https://mitblrsdg.club/track-project">Track Your Project</a></li>
              <li>We'll send you updates as your project moves through our review process</li>
            </ul>
            
            <p>Meanwhile, feel free to refine your proposal or share additional materials by replying to this email.</p>
            
            <p>Best regards,<br>
            <strong>MIT-BLR SDG Club Team 🌱</strong></p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              Questions? Contact us at <a href="mailto:projects@mitblrsdg.club">projects@mitblrsdg.club</a><br>
              Visit us: <a href="https://mitblrsdg.club">mitblrsdg.club</a>
            </p>
          `
        };
        
      case 'update':
        return {
          title: '📋 Project Status Update',
          content: `
            <p>Hi ${name},</p>
            <p>We have an update on your project '<strong>${projectTitle}</strong>'.</p>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="margin: 0 0 10px 0; color: #92400e;">Latest Update:</h3>
              <p style="margin: 0; color: #92400e;">${message || 'Your project is progressing well. Check the tracking page for detailed updates.'}</p>
            </div>
            
            <p>You can view detailed progress and timeline at: <a href="https://mitblrsdg.club/track-project?id=${submissionId}">Track Your Project</a></p>
            
            <p>Thank you for your patience and continued engagement!</p>
            
            <p>Best regards,<br>
            <strong>MIT-BLR SDG Club Team 🌱</strong></p>
          `
        };
        
      case 'selected':
        return {
          title: '🎉 Congratulations! Your project has been selected!',
          content: `
            <p>Hi ${name},</p>
            <p><strong>Fantastic news!</strong> Your project '<strong>${projectTitle}</strong>' has been selected for Stage 2 of our incubation program!</p>
            
            <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="margin: 0 0 10px 0; color: #065f46;">✨ You've Been Selected!</h3>
              <p style="margin: 0; color: #065f46;">Your innovative idea stood out among many submissions. We're excited to support your journey towards creating sustainable impact.</p>
            </div>
            
            <h3>What Happens Next?</h3>
            <ul>
              <li><strong>Mentorship Assignment:</strong> You'll be paired with industry experts and faculty advisors</li>
              <li><strong>Funding Discussion:</strong> We'll discuss budget requirements and funding allocation</li>
              <li><strong>Resource Access:</strong> Get access to labs, equipment, and technical resources</li>
              <li><strong>Timeline Planning:</strong> Develop a detailed project roadmap and milestones</li>
            </ul>
            
            <p><strong>Next Steps:</strong> Our team will contact you within 3-5 days to schedule an orientation meeting and discuss the project roadmap.</p>
            
            <p>Congratulations once again, and welcome to the MIT-BLR SDG Innovation family!</p>
            
            <p>Best regards,<br>
            <strong>MIT-BLR SDG Club Team 🌱</strong></p>
          `
        };
        
      case 'completed':
        return {
          title: '🏆 Project Completion - Congratulations!',
          content: `
            <p>Hi ${name},</p>
            <p><strong>Congratulations!</strong> Your project '<strong>${projectTitle}</strong>' has been successfully completed! 🎉</p>
            
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="margin: 0 0 10px 0; color: #065f46;">🏆 Mission Accomplished!</h3>
              <p style="margin: 0; color: #065f46;">Your dedication and innovative thinking have contributed to creating a positive impact on our community and environment.</p>
            </div>
            
            <h3>Project Impact Highlights:</h3>
            <p>${message || 'Your project has successfully met all objectives and is now ready for deployment/implementation.'}</p>
            
            <h3>What's Next?</h3>
            <ul>
              <li><strong>Impact Showcase:</strong> Your project will be featured in our success stories</li>
              <li><strong>Alumni Network:</strong> Join our network of successful innovators</li>
              <li><strong>Future Opportunities:</strong> Get priority access to advanced programs and collaborations</li>
              <li><strong>Mentorship Role:</strong> Opportunity to mentor future project teams</li>
            </ul>
            
            <p>We're incredibly proud of your achievement and look forward to seeing the continued impact of your work!</p>
            
            <p>Best regards,<br>
            <strong>MIT-BLR SDG Club Team 🌱</strong></p>
          `
        };
        
      default:
        return {
          title: 'MIT-BLR SDG Club Update',
          content: `<p>Hi ${name},</p><p>Thank you for being part of our sustainability journey!</p>`
        };
    }
  };

  const { title, content } = getEmailContent();

  // This would be used by an email service like SendGrid, Mailgun, etc.
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #3b82f6', paddingBottom: '20px' }}>
        <h1 style={{ color: '#3b82f6', margin: '0 0 10px 0' }}>MIT-BLR SDG Club</h1>
        <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>Empowering Sustainable Innovation</p>
      </div>
      
      {/* Main Content */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#374151', marginBottom: '20px' }}>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      
      {/* Footer */}
      <div style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px', marginTop: '30px' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0' }}>
          This email was sent to you because you submitted a project to MIT-BLR SDG Club.<br/>
          If you have any questions, please contact us at{' '}
          <a href="mailto:projects@mitblrsdg.club" style={{ color: '#3b82f6' }}>projects@mitblrsdg.club</a>
        </p>
      </div>
    </div>
  );
};

// Email service integration functions
export const sendConfirmationEmail = async (data: {
  name: string;
  email: string;
  projectTitle: string;
  submissionId: string;
}) => {
  // This would integrate with your email service (SendGrid, Mailgun, etc.)
  const emailTemplate = EmailTemplate({
    name: data.name,
    projectTitle: data.projectTitle,
    submissionId: data.submissionId,
    status: 'confirmation'
  });
  
  // Example integration:
  // await emailService.send({
  //   to: data.email,
  //   subject: getSubject(),
  //   html: ReactDOMServer.renderToString(emailTemplate)
  // });
  
  console.log('Confirmation email sent to:', data.email);
};

export const sendStatusUpdateEmail = async (data: {
  name: string;
  email: string;
  projectTitle: string;
  submissionId: string;
  status: 'update' | 'selected' | 'completed';
  message?: string;
}) => {
  // Similar implementation for status updates
  console.log('Status update email sent to:', data.email);
};

export default EmailTemplate;