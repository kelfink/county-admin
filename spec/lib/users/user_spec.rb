# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Users
  describe User do
    describe 'attributes' do
      subject { User }
      it { is_expected.to have_attribute(:editable, Types::String.optional) }
      it { is_expected.to have_attribute(:roles, Types::String.optional) }
    end
  end
end
